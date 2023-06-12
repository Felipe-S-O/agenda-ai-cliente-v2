import Titulo from "./Titulo";

interface LayoutProps {
    children: any
}

export default function Layout(props: LayoutProps) {
    return (
        <div className={`
         flex flex-col w-80
         bg-white text-gray-800 rounded-md
         `}>

            <Titulo/>
            <div className=" p-4 py-4">
                {props.children}
            </div>

        </div>
    )
}