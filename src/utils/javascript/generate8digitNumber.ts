const generate8digitNumber = () : number => {
  const otp = Math.floor(10000000 + Math.random() * 90000000);
  return otp;
};

export default generate8digitNumber;
