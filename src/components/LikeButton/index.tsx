// icons
import Heart from "@/assets/icons/heart";
// interfaces
import { LikeButtonProps } from "@/interfaces/components";
// styles
import * as C from "./styles";
// utils
import { addToFav } from "@/utils/functions/add-to-fav";

export default function LikeButton({
  user,
  pokemon,
  className,
  onClick,
}: LikeButtonProps) {
  return (
    <C.LikeButton
      className={className}
      onClick={() => {
        addToFav(user, pokemon);
        onClick?.(pokemon);
      }}
    >
      <Heart />
    </C.LikeButton>
  );
}
