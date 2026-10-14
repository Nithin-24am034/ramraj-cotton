import fs from 'fs';

const imageMap = {
  'rr-dhoti-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_3ee2ca35-5d7c-4e83-ab44-2f750ca59d48.jpg?v=1739623766',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_045a8862-b8cf-4e41-ad5a-7f957b596348.jpg?v=1739623766',
    'https://ramrajcotton.in/cdn/shop/collections/01_d247eea8-9818-4e60-928f-0168b125ebb6.jpg?v=1728567031',
  ],
  'rr-dhoti-002': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_b28406bf-5b67-4ff9-811b-2cd04365771a.png?v=1789556947',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/05_a516ce1a-6a37-4ef8-8df0-b23a40194843.png?v=1789556947',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_02f22b1e-7831-4045-afa4-00d316ed1ff1.png?v=1789556947',
  ],
  'rr-dhoti-003': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_2399d38c-67c9-4054-982e-5ca0fc481df9.png?v=1790676266',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_64927911-f01a-4eac-8ebe-7b52c908296e.jpg?v=1790676266',
  ],
  'rr-dhoti-004': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_3e83cf55-55c7-480d-b6f1-3ec54a831914.jpg?v=1750758467',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_2c2c9200-3810-4b46-99d0-e5ee953ef3ea.jpg?v=1750758467',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_298b506c-aae5-4ee9-8c25-176c04ce6211.jpg?v=1750758856',
  ],
  'rr-dhoti-005': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/dhoti_1_dd199eaf-926e-49c9-b211-f5203a37dc31.png?v=1790313440',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/05_d4ac3977-2d2b-4c3e-bfa8-9b2d917183b1.png?v=1790313440',
  ],
  'rr-dhoti-006': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_03b5bb77-27f9-4a79-8a14-db05d7b3fbff.jpg?v=1739870566',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_375216f9-82eb-4124-af54-5363b9374896.jpg?v=1739870566',
  ],
  'rr-shirt-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/05_ae8e4826-d63f-48d2-b5b7-f5d209dd3eee.jpg?v=1782543109',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_1c676068-f06b-4104-95f8-9245b16c9d73.jpg?v=1782887021',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/NewProject_1_fcd50886-36de-4863-a5ae-43c20f994989.jpg?v=1782883852',
  ],
  'rr-shirt-002': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/5_a81ca979-62ac-47c0-8c88-ec54e1ea585e.jpg?v=1784001640',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_1b8f2722-9fa1-4a1f-a3a5-fa9148289533.jpg?v=1784001140',
  ],
  'rr-shirt-003': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_8b13d889-2cfc-46d9-9ec0-27346f95f948.jpg?v=1725693102',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_41256a78-e88c-4017-82d6-50074fe8c2b2.jpg?v=1737613226',
  ],
  'rr-shirt-004': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/NewProject_1_fcd50886-36de-4863-a5ae-43c20f994989.jpg?v=1782883852',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_5890287f-e768-41c0-907e-b8be7df5efe1.jpg?v=1787554959',
  ],
  'rr-kurta-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/241224_Ecom_Ramraj20201.jpg?v=1735378626',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/1_bbe76d84-071d-4325-b12e-c49fc5c9de8a.jpg?v=1672901119',
  ],
  'rr-combo-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_a8f6b7f7-c9a7-49ed-8bc8-adcf2e04a805.jpg?v=1781686841',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/Gold_F.jpg?v=1697192860',
  ],
  'rr-inner-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/5_f1a0ff1a-5d22-4a5b-9f4a-c02b9a6623b8.jpg?v=1784108069',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_59298364-597b-4214-b36f-9313dca7e3d2.jpg?v=1784108296',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/1_7475e303-60da-4bf9-9ec2-7878e3a94700.jpg?v=1784108383',
  ],
  'rr-inner-002': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/4_2a810d34-ec83-4faa-9ebd-3798bc6aa0bf.jpg?v=1791527038',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_f08957b2-0c41-4a9a-9daf-55623c21c399.jpg?v=1786958854',
  ],
  'rr-lungi-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/greencheck_5756_219a5a23-7921-4b8e-b501-c46273c830ba.jpg?v=1771060950',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/greencheck_5750_67f511bd-174e-406f-8694-6ef4193b0130.jpg?v=1771060950',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/DOTHI-31_6101.jpg?v=1767690498',
  ],
  'rr-kids-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/01_246a9cff-0c7c-40de-afb4-c0f21aa0889c.jpg?v=1659957541',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/Gold_F.jpg?v=1697192860',
  ],
  'ry-saree-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_792876f2-bf35-45b9-9f75-6a3b27a4337f.jpg?v=1788426817',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_5e3fe7ab-d4b6-4874-8aa6-f13f386464e6.jpg?v=1788253215',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/ChatGPTImageAug12_2026_01_49_33PM.png?v=1786522807',
  ],
  'ry-saree-002': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/SAREE_4_4fa8350a-9197-4695-8ed5-d1645388a123.jpg?v=1791950034',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/SAREE_2_c5616119-7b69-4f03-b7e3-a6e46fc803c6.jpg?v=1791950034',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/SAREE_1_9a5d674d-a3ce-4bd7-9887-c8223bc616be.jpg?v=1791950034',
  ],
  'ry-saree-003': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_292df0b2-d6e3-47ca-a208-8dc41f1accc9.png?v=1790769828',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_d295e713-2be4-4d44-9eb0-e6bf88334fb3.png?v=1790849137',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_0399174f-dbcc-4523-a4ff-31136410a304.png?v=1790769784',
  ],
  'ry-saree-004': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_c001331b-6f26-4887-bb43-087bfa2cb660.png?v=1785410287',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_aae1eeac-cc12-4c25-a9e2-7b28c1fb4a3b.jpg?v=1785410099',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_dd50a4f6-53c1-48f5-95f1-7fcdf1401880.png?v=1785478039',
  ],
  'ry-kurti-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_9dda9639-9d21-4874-b9b2-e23d07924028.png?v=1790234045',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/01_2b3365fd-e02a-4068-b81f-6b6ffdbe1fa3.png?v=1790234159',
  ],
  'ry-kurti-002': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_5cfd39ec-f81e-47e8-baf6-5681093fcdb5.png?v=1790234253',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/02_9dda9639-9d21-4874-b9b2-e23d07924028.png?v=1790234045',
  ],
  'ry-inner-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/Untitled-2_0029_DSC09169_853739f3-a1dd-4fe6-b0a5-d1a6863ca6a9.jpg?v=1679997373',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/Untitled-2_0008_Untitled-2_0008_DSC09240_60d0589e-7aa8-4a9f-b6c3-16cdf1e2c58b.jpg?v=1679996999',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/products/Untitled-2_0013_Untitled-2_0012_DSC09230_0aaedd95-d7f0-4707-addf-827240d993aa.jpg?v=1679996679',
  ],
  'ry-night-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/07_6881e6f5-98fe-405f-8da1-756d7148c6c3.jpg?v=1748520536',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/05_27ba108d-9f3b-4150-948b-cfaa46bc04d2.jpg?v=1748327814',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/04_1131d6ab-4fe4-4fe2-a433-ac4bb4d5af04.jpg?v=1748331291',
  ],
  'ry-girls-001': [
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_206cc917-d287-4107-960a-418161a98557.jpg?v=1780916685',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/2_550b08ab-d299-4d78-af96-95e8b6c8a0f5.jpg?v=1780917131',
    'https://cdn.shopify.com/s/files/1/0094/0716/8559/files/03_96335079-97c4-4de1-b1be-f7efc67aa0f6.jpg?v=1787127974',
  ],
};

let productsContent = fs.readFileSync('src/lib/products.ts', 'utf8');

// For each product id, replace images array
for (const [id, imgs] of Object.entries(imageMap)) {
  const idPattern = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?images:\\s*\\[)[\\s\\S]*?(\\])`);
  if (!idPattern.test(productsContent)) {
    console.error(`ID ${id} not found in products.ts!`);
    continue;
  }
  const formattedImgs = '\n' + imgs.map(i => `      '${i}',`).join('\n') + '\n    ';
  productsContent = productsContent.replace(idPattern, `$1${formattedImgs}$2`);
  console.log(`Updated images for ${id}`);
}

fs.writeFileSync('src/lib/products.ts', productsContent, 'utf8');
console.log('Successfully updated all product images in src/lib/products.ts!');
