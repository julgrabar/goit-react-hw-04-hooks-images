import { RoundLoader } from './Loader.styled';

export const Loader = () => (
  <RoundLoader>
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </RoundLoader>
);
