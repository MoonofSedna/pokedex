// interfaces
import {
  EvolutionData,
  EvolutionChain,
} from "@/interfaces/pokemon";
// utils
import { getImageURL } from "./get-image-url";

export const parseEvolutionChain = (
  evolution: EvolutionData
) => {
  if (!evolution.evolves_to.length) {
    return [];
  }

  const triggersDisplayName = {
    "level-up": "Lvl",
    trade: "Trade",
    "use-item": "Use",
  };

  const extractId = (url: string) =>
    url.match(
      /\/(\d+)\//
    )?.[1] as string;

  return evolution.evolves_to.reduce(
    (carry, nextEvolution) => {
      const details =
          nextEvolution
            .evolution_details[0],
        currentId = extractId(
          evolution.species.url
        ),
        nextId = extractId(
          nextEvolution.species.url
        );

      carry.push({
        current: {
          name: evolution.species.name,
          id: +currentId,
          img: getImageURL(
            +currentId,
            true
          ),
        },
        next: {
          name: nextEvolution.species
            .name,
          id: +nextId,
          img: getImageURL(
            +nextId,
            true
          ),
        },
        trigger:
          triggersDisplayName[
            details.trigger
              .name as keyof typeof triggersDisplayName
          ] || "",
        triggerValue:
          details.min_level ||
          details.min_happiness ||
          details.item?.name.replace(
            "-",
            " "
          ) ||
          "",
      });

      carry.push(
        ...parseEvolutionChain(
          nextEvolution as unknown as EvolutionData
        )
      );

      return carry;
    },
    [] as EvolutionChain[]
  );
};
