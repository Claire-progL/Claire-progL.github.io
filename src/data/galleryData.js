// Cloudinary 配置
export const cloudinaryConfig = {
  cloudName: 'yi0zpxm7',
};

// 照片列表 - 填入具体的 publicId
// className 可选值：
// 宽度: col-span-1 (默认), md:col-span-2 (占2列)
// 高度: row-span-1 (默认), md:row-span-2, md:row-span-3, md:row-span-4 等
// title 和 description 支持中英文切换：{ zh: "中文", en: "English" }
export const galleryImages = [
   { id: 1, publicId: 'FuzhouGuShan', className: "md:col-span-3 md:row-span-3", title: { zh: "福州鼓山", en: "FuzhouGuShan" }, description: { zh: "", en: "" } },
  { id: 2, publicId: 'BeijingYiHeYuanCloud', className: "md:col-span-2 md:row-span-3", title: { zh: "北京颐和园白云", en: "BeijingYiHeYuanCloud" }, description: { zh: "", en: "" } },
  { id: 3, publicId: 'BeijingYiHeYuan', className: "md:col-span-2 md:row-span-3", title: { zh: "北京颐和园", en: "BeijingYiHeYuan" }, description: { zh: "", en: "" } },
  { id: 5, publicId: 'Luoyangsuitang', className: "md:col-span-3 md:row-span-3", title: { zh: "洛阳隋唐", en: "Luoyangsuitang" }, description: { zh: "", en: "" } },
  { id: 6, publicId: 'NangcangCloud', className: "md:col-span-2 md:row-span-3", title: { zh: "南昌白云", en: "NangcangCloud" }, description: { zh: "", en: "" } },
  { id: 7, publicId: 'Nancang', className: "md:col-span-3 md:row-span-3", title: { zh: "南昌", en: "Nancang" }, description: { zh: "", en: "" } },
  { id: 8, publicId: 'HanzhouUniversity', className: "md:col-span-2 md:row-span-3", title: { zh: "浙江大学", en: "HanzhouUniversity" }, description: { zh: "", en: "" } },
  { id: 9, publicId: 'HangzhouXihuLake', className: "col-span-3 md:row-span-3", title: { zh: "杭州西湖", en: "HangzhouXihuLake" }, description: { zh: "", en: "" } },
];

// 生成 Cloudinary URL 的工具函数
// f_auto: 自动转换格式 (webp/avif)，体积减少约 50%
// q_auto: 自动压缩质量，肉眼几乎看不出区别
export const getCloudinaryUrl = (publicId, type = 'thumb') => {
  if (type === 'thumb') {
    // 缩略图：小尺寸，快速加载
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/f_auto,q_auto,w_400/${publicId}`;
  } else {
    // 高清图：展开后查看，限制最大宽度
    return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/f_auto,q_auto,w_1600/${publicId}`;
  }
};

// 照片分类配置
export const galleryCategories = {
  nature: { ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], label: { zh: '自然', en: 'nature' } },
};

// 按分类获取照片
export const getImagesByCategory = (category) => {
  const categoryConfig = galleryCategories[category];
  if (!categoryConfig) return [];
  return galleryImages.filter(img => categoryConfig.ids.includes(img.id));
};

// 辅助函数：根据语言获取本地化文本
export const getLocalizedText = (textObj, locale = 'zh') => {
  if (typeof textObj === 'string') return textObj;
  return textObj[locale] || textObj.zh || '';
};
