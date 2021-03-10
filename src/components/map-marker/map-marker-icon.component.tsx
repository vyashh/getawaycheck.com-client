interface Props {
  fill: string;
}

const MapMarkerIcon: React.FC<Props> = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="30"
      viewBox="0 0 21 30"
    >
      <path
        id="Icon_material-location-on"
        data-name="Icon material-location-on"
        d="M18,3A10.492,10.492,0,0,0,7.5,13.5C7.5,21.375,18,33,18,33S28.5,21.375,28.5,13.5A10.492,10.492,0,0,0,18,3Zm0,14.25a3.75,3.75,0,1,1,3.75-3.75A3.751,3.751,0,0,1,18,17.25Z"
        transform="translate(-7.5 -3)"
        fill={fill}
      />
    </svg>
  );
};

export default MapMarkerIcon;
