import './FooterStyles.css'
const F = () => {
  const year = new Date().getFullYear();

  return <footer>{`Copyright © Pharmaceutical Supply Chain ${year}`}</footer>;
};

export default F;