import { useUserPilotTour } from '../../hooks/userPilotTour/useUserPilotTour';

const UserPilotProvider = ({ children }) => {
  // userPilot Tour
  useUserPilotTour();

  return children;
};

export default UserPilotProvider;
