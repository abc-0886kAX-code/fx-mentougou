import { DetailsAddress, DetailsMethod } from "./config";
import { useService } from "@/service/Application";
import { transFormData } from "~/shared/trans";
import SITE from "@/assets/json/site.json";

const service = useService();
function transResponse(response) {
    const data = get(response, "data.data", {});
    return { data };
}

export const Details_Server = service.define({
    url: DetailsAddress,
    method: DetailsMethod,
});

export function Details_Obtain(props) {
    Details_Server.server.config.bind("params", props);
    return Details_Server.obtain({ transResponse });
}

export default Details_Server;
