import { Layout } from "../../components/Layout/Layout"
import styles from "./BoxesPage.module.css"
import { BaseHomeRenderPath, Image } from "../../components/Image"
import React from "react"
import { CalcBoxPosition } from "../../app/utils"
import usePokemonList from "../../hooks/usePokemonList"
import useQueryOptions from "../../hooks/useQueryOptions"

/**
 * @param {PokemonListItemSimple} pkm
 */
function createPokemonElement(pkm) {
  return <div title={pkm.name}
              tabIndex={pkm.tabIndex}
              key={pkm.id}
              className={styles["box-cell"]}>
    <figure>
      <Image className={styles["box-img"]}
             // src={BaseHomeRenderPath + pkm.file}
             src={BaseHomeRenderPath + "/regular/" + pkm.file}
             alt={pkm.name} />
      <figcaption>{pkm.name}</figcaption>
    </figure>
  </div>
}

/**
 * @param {PokemonListItemSimple[]} pokemonList
 */
function createBoxes(pokemonList) {
  let boxes = new Map()

  // First, distribute Pokemon list in boxes, rows and cols
  pokemonList.forEach((pkm, i) => {
    let pos = CalcBoxPosition(i, 5, 6)
    if (!boxes.has(pos.box)) {
      boxes.set(pos.box, new Map())
    }
    let box = boxes.get(pos.box)
    if (!box.has(pos.row)) {
      box.set(pos.row, new Map())
    }
    let row = box.get(pos.row)
    row.set(pos.col, pkm)
  })

  // Second, iterate all boxes, rows and cols to render elements
  let boxElements = []
  boxes.forEach((box, boxIndex) => {
    let boxPokemon = []
    box.forEach((row, rowIndex) => {
      row.forEach((pkm, colIndex) => {
        boxPokemon.push(createPokemonElement(pkm))
      })
    })
    boxElements.push(<div key={boxIndex} className={styles["box"]}>
      <div className={styles["box-header"]}>
        <div className={styles["box-title"]}>{"Box " + (boxIndex + 1)}</div>
      </div>
      <div className={styles["box-grid"]}>{boxPokemon}</div>
    </div>)
  })

  return boxElements
}

function BoxesPage() {
  const { pokemon, loading } = usePokemonList(useQueryOptions())

  let boxes = null
  let title = <span>Living Dex</span>
  let subtitle = "Loading..."

  if (loading === false) {
    boxes = createBoxes(pokemon)
    subtitle = "Box Organization (" + pokemon.length + " Storable Pokémon)"
  }

  return (
    <div className="app themeTeal bgGradientDown">
      <Layout title={title} subtitle={subtitle}>
        <div className={styles["box-group"]}>
          <div className={styles["box-group-content"]}>
            {boxes}
          </div>
        </div>
      </Layout>
    </div>
  )
}

BoxesPage.propTypes = {}

export default BoxesPage