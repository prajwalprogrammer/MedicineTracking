import './FooterStyles.css'
import SocialFollow from './SocialFollow'
const F = () => {
  const year = new Date().getFullYear();

  return <footer><SocialFollow/>{`Copyright © Pharmaceutical Supply Chain ${year}`}</footer>;
};

export default F;