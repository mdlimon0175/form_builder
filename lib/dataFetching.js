import appConfig from "@/config/appConfig"

export const fetchFormBuilderData = () => {
    return fetch(appConfig.api_url).then((res) => res.json())
}