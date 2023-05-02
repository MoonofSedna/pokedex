import React from "react";
import Image from "next/image";
import Link from "next/link";
// components
import Icon from "../Icon";
import DefaultMessage from "../DefaultMessage";
// interfaces
import { PokemonFullData } from "@/interfaces/pokemon";
// styles
import * as C from "./styles";
// utils
import { formatStats } from "@/utils/format-stats";

interface PokemonCardProps {
  pokemon: PokemonFullData;
}
export default function PokemonCard({
  pokemon,
}: PokemonCardProps) {
  return (
    <C.Container>
      <C.PokemonStats>
        <C.StatsTitle>
          Stats
        </C.StatsTitle>
        <C.StatsList>
          {pokemon.stats.map(
            ({ stat, base_stat }) => {
              return (
                <li key={stat.name}>
                  <Icon
                    name={stat.name}
                    width={20}
                    height={20}
                  />
                  <span>
                    {
                      formatStats[
                        stat.name as keyof typeof formatStats
                      ]
                    }
                  </span>
                  <span>
                    {base_stat}
                  </span>
                  <C.ProgressBar>
                    <C.ProgressBarFill
                      base_stat={
                        base_stat
                      }
                    />
                  </C.ProgressBar>
                </li>
              );
            }
          )}
        </C.StatsList>
      </C.PokemonStats>
      <C.PokemonStats>
        <C.StatsTitle>
          Evolutions
        </C.StatsTitle>
        <C.EvolutionList>
          {pokemon.evolutions.length >
          0 ? (
            pokemon.evolutions.map(
              (evolution) => {
                return (
                  <C.EvolutionGroup
                    key={
                      evolution.current
                        .id
                    }
                  >
                    <C.EvolutionCard>
                      <Link
                        href={`/pokemon/${evolution.current.id}`}
                      >
                        <C.Evolution
                          key={
                            evolution
                              .current
                              .id
                          }
                        >
                          <Image
                            src={
                              evolution
                                .current
                                .img
                            }
                            alt={
                              evolution
                                .current
                                .name
                            }
                            width={100}
                            height={100}
                          />
                          <span>
                            {
                              evolution
                                .current
                                .name
                            }
                          </span>
                        </C.Evolution>
                      </Link>
                    </C.EvolutionCard>
                    <C.ArrowRight>
                      {evolution.trigger &&
                        evolution.triggerValue && (
                          <span>
                            {`${evolution.trigger} ${evolution.triggerValue}`}
                          </span>
                        )}
                      <Icon
                        name="arrow"
                        width={50}
                        height={50}
                      />
                    </C.ArrowRight>
                    <C.EvolutionCard>
                      <Link
                        href={`/pokemon/${evolution.next.id}`}
                      >
                        <C.Evolution
                          key={
                            evolution
                              .next.id
                          }
                        >
                          <Image
                            src={
                              evolution
                                .next
                                .img
                            }
                            alt={
                              evolution
                                .next
                                .name
                            }
                            width={100}
                            height={100}
                          />
                          <span>
                            {
                              evolution
                                .next
                                .name
                            }
                          </span>
                        </C.Evolution>
                      </Link>
                    </C.EvolutionCard>
                  </C.EvolutionGroup>
                );
              }
            )
          ) : (
            <DefaultMessage message="No evolutions" />
          )}
        </C.EvolutionList>
      </C.PokemonStats>
    </C.Container>
  );
}
