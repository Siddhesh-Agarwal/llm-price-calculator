import { Skeleton } from "./ui/skeleton";

export default function LoadingSkeleton() {
    return (
        <div className="flex flex-col gap-2 w-full">
            {Array.from({ length: 8 }, (_, i) => (
                <Skeleton key={i} className="h-6 w-full rounded" />
            ))}
        </div>
    );
}
