import { useState } from "react";
import Image from "next/image";
// components
import Spinner from "@/assets/icons/spinner.svg";
// interfaces
import { ImageProps } from "@/interfaces/components";
// styles
import * as C from "./styles";

export default function Images({
  src,
  alt,
  width,
  height,
  priority,
  draggable,
  className,
}: ImageProps) {
  const [isLoaded, setIsLoaded] =
    useState(false);

  return (
    <>
      {!isLoaded && (
        <C.Spinner>
          <Image
            src={Spinner}
            alt="loading"
          />
        </C.Spinner>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        draggable={draggable}
        className={className}
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </>
  );
}
