// src/data/graduateData.ts

export const graduateProfileData = [
  { label: 'graduate:profile.labels.name_th', value: 'xxxxxx xxxxxxxxx' }, 
  { label: 'graduate:profile.labels.name_en', value: 'xxxxxx xxxxxxxxx' }, 
  { label: 'graduate:profile.labels.citizen_id', value: '1 2345 67890 12 3' },
  { label: 'graduate:profile.labels.student_id', value: '0123456789' },
  { label: 'graduate:profile.labels.campus', value: 'xxxxxxxxx' }, 
  { label: 'graduate:profile.labels.degree', value: 'xxxxxxxxx' }, 
  { label: 'graduate:profile.labels.faculty', value: 'xxxxxxxxx' },
  { label: 'graduate:profile.labels.department', value: 'xxxxxxxxx' }, 
  { label: 'graduate:profile.labels.major', value: 'xxxxxxxxx' }, 
  { label: 'graduate:profile.labels.curriculum', value: 'xxxxxxxxx' }, 
  { label: 'graduate:profile.labels.dob', value: 'xx xx xxxx' }, 
  { label: 'graduate:profile.labels.nationality', value: 'xxxxxxxxx' }, 
  { label: 'graduate:profile.labels.address', value: 'xx xxxxxxx xxxxxxxxx' }, 
];

// ข้อมูลสำหรับ Sidebar (กรณีอยาก mock แยก หรือจะดึงจาก user prop ก็ได้)
export const graduateSidebarUser = {
  name: '', // ให้ว่างไว้เพื่อให้ Component ใช้ User prop หรือ fallback
  studentId: '',
  degree: ''
};