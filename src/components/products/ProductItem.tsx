type ProductItemProps = {
    image: string;
    name: string;
};

export default function ProductItem({ image, name }: ProductItemProps) {
    return (
        <div className="flex flex-col items-center">
            <img
                src={image}
                alt={name}
                className="h-28 object-contain transition-all duration-300 hover:scale-110"
            />
            <span className="mt-2 text-xs text-gray-300">{name}</span>
        </div>
    );
}
