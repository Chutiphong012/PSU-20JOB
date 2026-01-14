// src/data/graduateData.ts

export const graduateProfileData = [
  { label: 'ชื่อ-สกุล (ไทย)', value: 'xxxxxx xxxxxxxxx' }, 
  { label: 'ชื่อ-สกุล (อังกฤษ)', value: 'xxxxxx xxxxxxxxx' }, 
  { label: 'เลขที่บัตรประชาชน', value: '1 2345 67890 12 3' },
  { label: 'รหัสนักศึกษา', value: '0123456789' },
  { label: 'วิทยาเขต', value: 'xxxxxxxxx' }, 
  { label: 'ระดับการศึกษา', value: 'xxxxxxxxx' }, 
  { label: 'คณะ', value: 'xxxxxxxxx' },
  { label: 'ภาควิชา', value: 'xxxxxxxxx' }, 
  { label: 'สาขา', value: 'xxxxxxxxx' }, 
  { label: 'หลักสูตร', value: 'xxxxxxxxx' }, 
  { label: 'วัน เดือน ปีเกิด', value: 'xx xx xxxx' }, 
  { label: 'สัญชาติ', value: 'xxxxxxxxx' }, 
  { label: 'ที่อยู่', value: 'xx xxxxxxx xxxxxxxxx' }, 
];

// ข้อมูลสำหรับ Sidebar (กรณีอยาก mock แยก หรือจะดึงจาก user prop ก็ได้)
export const graduateSidebarUser = {
  name: 'ชื่อ นามสกุล',
  studentId: 'รหัสนักศึกษา',
  degree: 'ปริญญาตรี'
};