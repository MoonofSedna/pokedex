// icons
import Heart from "@/assets/icons/heart";
// interfaces
import { User } from "@/interfaces/user";
// styles
import * as C from "./styles";
// utils
import { addToFav } from "@/utils/add-to-fav";

interface LikeButtonProps {
  user: User;
  pokemon: number;
  className?: string;
}

export default function LikeButton({
  user,
  pokemon,
  className,
}: LikeButtonProps) {
  return (
    <C.LikeButton
      className={className}
      onClick={() =>
        addToFav(user, pokemon)
      }
    >
      <Heart />
    </C.LikeButton>
  );
}
