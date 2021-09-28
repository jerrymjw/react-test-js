import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./serch-panel";
import * as qs from "qs";
import { cleanObject, isTrue } from "screens/utils";


const apiURL = process.env.REACT_APP_API_URL;

export const ProjectSearchList = () => {
    const [param, setParam] = useState({ project_name: "", manager_id: "" });
    const [managers, setManagers] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(`${apiURL}/managers`).then(async (response) => {
            if (response) {
                setManagers(await response.json())
            }
        })
    }, [])

    const changeParamProjectName = (object) => {
        const result = { ...object }
        const value = result["project_name"]
        if (isTrue(value)) {
            result["name"] = value
            delete result["project_name"]
        }
        return result
    }

    useEffect(() => {
        fetch(`${apiURL}/projects?${qs.stringify(changeParamProjectName(cleanObject(param)))}`).then(async (response) => {
            if (response) {
                setList(await response.json())
            }
        })
    }, [param])
    return <>
        <SearchPanel param={param} setParam={setParam} managers={managers} />
        <List list={list} managers={managers} />
    </>
}
