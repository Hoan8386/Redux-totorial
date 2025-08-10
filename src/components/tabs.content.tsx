import { Tab, Tabs } from "react-bootstrap";
import { TableUser } from "./user.table";

export const TabsContent = () => {
    return (
        <Tabs
            defaultActiveKey="user"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="user" title="Users" >
                <TableUser />
            </Tab>
            <Tab eventKey="blog" title="Blogs">
                Tab content for Profile
            </Tab>

        </Tabs>
    );
}