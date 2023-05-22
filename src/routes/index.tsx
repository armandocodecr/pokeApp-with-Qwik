import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon';

export default component$(() => {

  const pokemonId = useSignal(1)
  const isBack = useSignal(false)
  const isRevelated = useSignal(true)

  const changePokemonId = $(( value: number ) => {
    if( (pokemonId.value + value) <= 0 ) return

    pokemonId.value += value;
  })

  return (
    <>
      <span class="text-2xl">Buscador simple</span>

      <span class="text-9xl">{ pokemonId }</span>

      <PokemonImage 
        pokemonId={pokemonId.value} 
        backImage={isBack.value} 
        size={300} 
        isRevelated={isRevelated.value}
      />

      <div class="flex mt-2 gap-2">
        <button 
          class="btn btn-primary"
          onClick$={() => changePokemonId(-1) }
        >
          Anterior
        </button>
        <button 
          class="btn btn-primary"
          onClick$={() => changePokemonId(+1) }
        >
          Siguientes
        </button>
        <button 
          class="btn btn-primary"
          onClick$={() => isBack.value = !isBack.value }
        >
          Voltear
        </button>
        <button 
          class="btn btn-primary"
          onClick$={() => isRevelated.value = !isRevelated.value }
        >
          { isRevelated.value ? 'Revelar': 'Ocultar' }
        </button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Esta es mi segunda aplicacion con Qwik',
    },
  ],
};
