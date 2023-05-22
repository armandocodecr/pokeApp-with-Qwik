import { component$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
    pokemonId: number
    backImage: boolean
    size?: number
    isRevelated?: boolean
}

export const PokemonImage = component$(({ pokemonId, backImage = false, size = 200, isRevelated = true }: Props) => {

    const imageLoaded = useSignal(false)
    useTask$(({ track }) => {
        track(() => pokemonId);
        imageLoaded.value = false;
    })

    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ backImage ? `/back/${pokemonId}` : pokemonId }.png`

    return (
        <div class="flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
            
            {!imageLoaded.value && (
             <span 
              class='font-bold tracking-tight'
             >
              Cargando...
             </span>
            )}

            <img 
                src={imageUrl} 
                class={{ 
                    'hidden': !imageLoaded.value,
                    'brightness-0': isRevelated
                }}
                alt="pokemon sprite" 
                style={{ width: `${ size }px` }}
                onLoad$={ () => {
                    setTimeout(() => {
                        imageLoaded.value = true
                    }, 2000);
                }}
            />
        </div>
    )

})