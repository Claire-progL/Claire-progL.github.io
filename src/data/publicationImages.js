// 论文配图（中英文共用，按 publications 的 id 索引）
// 放在这里而不是 locales/*.json，避免中英两份数据各维护一次导致不同步。
const sources = {
  // 0: Deep Learning-Driven Distributed PV Segmentation...
  0: 'https://res.cloudinary.com/yi0zpxm7/image/upload/v1792841490/0pv.png',
  1: 'https://res.cloudinary.com/yi0zpxm7/image/upload/v1792841754/1LST.png',
  2: 'https://res.cloudinary.com/yi0zpxm7/image/upload/v1792841772/2RSEI.png',
  3: 'https://res.cloudinary.com/yi0zpxm7/image/upload/v1792841786/3City3D.png',
  4: 'https://res.cloudinary.com/yi0zpxm7/image/upload/v1792841800/4veghealth.png',
  // 5: Comparative Evaluation of Atmospheric Correction Models... (新加的第6个)`
  5: 'https://res.cloudinary.com/yi0zpxm7/image/upload/v1792841835/5AtmosphericCorrection.png',

};

// 插入 Cloudinary 变换参数：自动选格式（WebP/AVIF）、自动压缩、限制宽度
const withTransform = (url, width) =>
  url.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`);

export const getPublicationImage = (id, width = 800) =>
  sources[id] ? withTransform(sources[id], width) : null;
