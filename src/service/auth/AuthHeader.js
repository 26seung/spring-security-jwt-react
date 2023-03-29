export const authHeader = () => {
  const header = localStorage.getItem('Authorization');
  console.log('AuthHeader', header);
  //   if (header) {
  //     return header;
  //   }
};

export default authHeader;
