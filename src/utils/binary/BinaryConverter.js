export const binaryConverter = {
  toBinary(layers) {
    // 전체 크기 계산
    let size = 4; // 레이어 수
    layers.forEach((layer) => {
      size += 4 + 1 + layer.name.length + 1 + layer.type.length + 16;
      size += 12; // width, height, radius
      size += 1 + layer.properties.color.length + 4; // color, opacity
      if (layer.type === 'text' && layer.properties.text) {
        size += 2 + layer.properties.text.length;
      }
    });

    const buffer = new ArrayBuffer(size);
    const view = new DataView(buffer);
    let offset = 0;

    // 레이어
    view.setUint32(offset, layers.length);
    offset += 4;

    layers.forEach((layer) => {
      // 기본 속성
      view.setUint32(offset, layer.id);
      offset += 4;

      // name
      view.setUint8(offset, layer.name.length);
      offset += 1;
      for (let i = 0; i < layer.name.length; i++) {
        view.setUint8(offset + i, layer.name.charCodeAt(i));
      }
      offset += layer.name.length;

      // type
      view.setUint8(offset, layer.type.length);
      offset += 1;
      for (let i = 0; i < layer.type.length; i++) {
        view.setUint8(offset + i, layer.type.charCodeAt(i));
      }
      offset += layer.type.length;

      // 좌표
      view.setFloat32(offset, layer.x);
      offset += 4;
      view.setFloat32(offset, layer.y);
      offset += 4;
      view.setFloat32(offset, layer.z);
      offset += 4;

      // 크기 관련 속성
      view.setFloat32(offset, layer.width || 0);
      offset += 4;
      view.setFloat32(offset, layer.height || 0);
      offset += 4;
      view.setFloat32(offset, layer.radius || 0);
      offset += 4;

      // properties
      view.setUint8(offset, layer.properties.color.length);
      offset += 1;
      for (let i = 0; i < layer.properties.color.length; i++) {
        view.setUint8(offset + i, layer.properties.color.charCodeAt(i));
      }
      offset += layer.properties.color.length;

      view.setFloat32(offset, layer.properties.opacity);
      offset += 4;

      // text type인 경우 text 속성
      if (layer.type === 'text' && layer.properties.text) {
        view.setUint16(offset, layer.properties.text.length);
        offset += 2;
        for (let i = 0; i < layer.properties.text.length; i++) {
          view.setUint8(offset + i, layer.properties.text.charCodeAt(i));
        }
        offset += layer.properties.text.length;
      }
    });

    return buffer;
  },
  fromBinary(buffer) {
    const view = new DataView(buffer);
    let offset = 0;

    const layerCount = view.getUint32(offset);
    offset += 4;

    const layers = [];

    for (let i = 0; i < layerCount; i++) {
      // 기본 속성
      const id = view.getUint32(offset);
      offset += 4;

      // name
      const nameLength = view.getUint8(offset);
      offset += 1;
      let name = '';
      for (let j = 0; j < nameLength; j++) {
        name += String.fromCharCode(view.getUint8(offset + j));
      }
      offset += nameLength;

      // type
      const typeLength = view.getUint8(offset);
      offset += 1;
      let type = '';
      for (let j = 0; j < typeLength; j++) {
        type += String.fromCharCode(view.getUint8(offset + j));
      }
      offset += typeLength;

      // 좌표 읽기
      const x = view.getFloat32(offset);
      offset += 4;
      const y = view.getFloat32(offset);
      offset += 4;
      const z = view.getFloat32(offset);
      offset += 4;

      // 크기 관련 속성
      const width = view.getFloat32(offset);
      offset += 4;
      const height = view.getFloat32(offset);
      offset += 4;
      const radius = view.getFloat32(offset);
      offset += 4;

      // properties
      const colorLength = view.getUint8(offset);
      offset += 1;
      let color = '';
      for (let j = 0; j < colorLength; j++) {
        color += String.fromCharCode(view.getUint8(offset + j));
      }
      offset += colorLength;

      const opacity = view.getFloat32(offset);
      offset += 4;

      const properties = { color, opacity };

      // text type인 경우 text 속성
      if (type === 'text') {
        const textLength = view.getUint16(offset);
        offset += 2;
        let text = '';
        for (let j = 0; j < textLength; j++) {
          text += String.fromCharCode(view.getUint8(offset + j));
        }
        offset += textLength;
        properties.text = text;
      }

      layers.push({
        id,
        name,
        type,
        x,
        y,
        z,
        width,
        height,
        radius,
        properties,
      });
    }

    return layers;
  },
};
