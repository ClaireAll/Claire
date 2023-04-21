export const ROOT = "http://localhost:9000";

export function claireGet(url: string) {
    return fetch(`${ROOT}${url}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}
