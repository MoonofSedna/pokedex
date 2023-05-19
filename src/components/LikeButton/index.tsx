import { useContext } from "react";
// context
import { UserContext } from "@/context/userContext";
// icons
import Heart from "@/assets/icons/heart";
// interfaces
import { LikeButtonProps } from "@/interfaces/components";
// styles
import * as C from "./styles";
// utils
import { addToFav } from "@/utils/functions/add-to-fav";

export default function LikeButton({
  pokemon,
  className,
  onClick,
}: LikeButtonProps) {
  const {
    user,
    favorites,
    updateFavorites,
  } = useContext(UserContext);

  return (
    <C.LikeButton
      className={className}
      onClick={() => {
        addToFav(
          user,
          favorites,
          pokemon,
          updateFavorites
        );
        onClick?.(pokemon);
      }}
    >
      <Heart />
    </C.LikeButton>
  );
}
