import PersonIcon from "@mui/icons-material/Person";

interface UserAvatarProps {
    profilePath: string | null;
    userName: string;
  }
  
  export const UserAvatar = ({ profilePath, userName }: UserAvatarProps) => {
    return (
      <div className="hz-user-img w-[182px] h-[182px] border border-gray3 rounded-[50%] flex items-center justify-center">
        {profilePath ? (
          <img src={profilePath} alt={userName} style={{ width: "100%", height: "100%" }} />
        ) : (
          <PersonIcon style={{ width: "100%", height: "100%" }} className="text-gray3" />
        )}
      </div>
    );
  };
  