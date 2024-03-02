import "server-only"
import SubscriberForm from "./_components/SubscriberForm"

export default async function SubscriperFormPage({
    params: { subscriberId }
}: {
    params: { subscriberId?: string }
}) {
    return (
        <main>
            <h1>Форма Подписчика</h1>

            <SubscriberForm subscriberId={subscriberId} />
        </main>
    );
}