import HeaderPublic from "@/components/header-public";
import { Earth, Waves } from "lucide-react";

export default function Home(){
    return(
        <>
            <HeaderPublic />
            <div className="pt-20">
                    <p className="w-[500px] p-16 text-white font-black text-6xl absolute z-10">Mesmo nas águas mais turbulentas, a esperança é a âncora que nos mantém firmes.</p>
                    <div className="w-full h-full bg-gradient-to-r from-black to-black/10 absolute"></div>
                    <img className="w-screen h-screen object-cover z-0" src="background-agua.jpg"/>
            </div>
            <div className="w-screen h-[500px] text-center flex flex-col gap-10 pt-20 items-center justify-center">
                <p className="w-[750px] text-black font-medium">As enchentes no Rio Grande do Sul chegam como um pesadelo inevitável, trazendo consigo não apenas águas violentas, mas também o desespero e a dor de tantas vidas abaladas. Em questão de horas, o que antes era lar, segurança e aconchego, se transforma em ruínas, deixando para trás famílias desamparadas, olhares perdidos e corações partidos. Cada gota que cai do céu parece carregar o peso da incerteza, afogando sonhos e esperanças nas águas turbulentas.</p>
                <Waves />
                <p className="w-[750px] text-black font-medium">Nosso empenho em desenvolver este sistema foi movido pelo profundo compromisso de salvar vidas. Cada linha de código foi escrita com a consciência de que estávamos criando algo que poderia fazer a diferença em momentos de extrema vulnerabilidade. Investimos tempo, dedicação e conhecimento para assegurar que a tecnologia pudesse atuar como uma ferramenta poderosa na proteção de pessoas em risco. Sabemos que cada segundo conta, e por isso, nossa equipe trabalhou incansavelmente para criar uma solução robusta, ágil e confiável, capaz de ser a linha de defesa que essas vidas necessitam.</p>
            </div>
            <div className="flex items-center justify-around p-20">
                <div>
                    <div className="flex items-center gap-3">
                        <p className="text-9xl text-black font-extrabold">1</p>
                        <div className="w-[2px] h-24 bg-black rounded"></div>
                        <p className="w-[300px] text-black font-medium">Valorizamos a informação como a base para decisões seguras e bem-informadas.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="text-9xl text-black font-extrabold">2</p>
                        <div className="w-[2px] h-24 bg-black rounded"></div>
                        <p className="w-[300px] text-black font-medium">Nosso foco na prevenção visa evitar problemas antes que eles surjam. Assim trazendo mais seguraça.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="text-9xl text-black font-extrabold">3</p>
                        <div className="w-[2px] h-24 bg-black rounded"></div>
                        <p className="w-[300px] text-black font-medium">Acreditamos na ação rápida para transformar planos em resultados eficazes.</p>
                    </div>
                </div>
                <Earth className="w-[250px] h-[250px]" />
            </div>
        </>
    );
}