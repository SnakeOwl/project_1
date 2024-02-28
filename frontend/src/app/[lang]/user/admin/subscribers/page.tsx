import "server-only";

import Subscribers from "./_components/Subscribers";

export default async function SubscribersPage() {
    return (
        <main>
            <h1>Подписчики</h1>

            <Subscribers />
        </main>
    )
}