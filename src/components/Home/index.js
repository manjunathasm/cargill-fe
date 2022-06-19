import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  List,
  message,
  Row,
  Typography,
} from "antd";
import styles from "../../../styles/Home.module.css";
import Search from "antd/lib/input/Search";
import { Content } from "antd/lib/layout/layout";

export default React.memo(function home(props) {
  const [form] = Form.useForm();

  const [teams, setTeams] = useState([]);
  const [roles, setRoles] = useState([]);
  const [teamRoles, setTeamRoles] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    getTeamsAndRolesData();
  }, []);

  const getTeamsAndRolesData = () => {
    axios
      .get("http://127.0.0.1:5000/teams")
      .then(function (response) {
        setTeams(response.data["data"]);
      })
      .catch(function (error) {
        message.error(error);
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    axios
      .get("http://127.0.0.1:5000/roles")
      .then(function (response) {
        setRoles(response.data["data"]);
      })
      .catch(function (error) {
        message.error(error);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const getTeamRoles = (team_name) => {
    setSearchValue(team_name);
    axios
      .get("http://127.0.0.1:5000/team/" + team_name + "/roles")
      .then(function (response) {
        setTeamRoles(response.data["data"]);
      })
      .catch(function (error) {
        message.error(error.response.data.message);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const onFinish = (values) => {
    // console.log("Success:", values);
    axios
      .post("http://127.0.0.1:5000/team/assign/role", values)
      .then(function (response) {
        message.success(response.data["message"]);
      })
      .catch(function (error) {
        message.error(error.response.data.message);
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Content>
      <div className={styles.container}>
        <main className={styles.main} style={{ minWidth: 800 }}>
          <h1 className={styles.title}>
            Welcome to <a href="http://127.0.0.1:3000">Cargill!</a>
          </h1>
          <br />
          <br />

          <Card title="Assign Role" bordered={false} style={{ width: 600 }}>
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              {...{
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
              }}
              form={form}
            >
              <Form.Item
                label="Team Name"
                name="team_name"
                rules={[{ required: true, message: "Please input team name" }]}
              >
                <Input placeholder="input team name" />
              </Form.Item>
              <Form.Item
                label="Role Name"
                name="role_name"
                rules={[{ required: true, message: "Please input role name" }]}
              >
                <Input placeholder="input role name" />
              </Form.Item>
              <Form.Item
                {...{
                  wrapperCol: { span: 14, offset: 6 },
                }}
              >
                <Button type="primary" htmlType="submit">
                  Assign
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card title="Find Team Details" style={{ width: 600 }}>
            <Row>
              <Search
                placeholder="input team name"
                enterButton="GET"
                size="large"
                onSearch={getTeamRoles}
              />
            </Row>
            <br />
            <Row>
              {teamRoles && (
                <Descriptions
                  bordered
                  title="Team Details"
                  size={"small"}
                  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                  layout="vertical"
                >
                  <Descriptions.Item label="Name" span={3}>
                    {searchValue}
                  </Descriptions.Item>
                  <Descriptions.Item label="Roles Info">
                    <List
                      size="small"
                      bordered
                      dataSource={teamRoles || ["...no roles added"]}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                  </Descriptions.Item>
                </Descriptions>
              )}
            </Row>
          </Card>

          <br />
          <br />

          <Row style={{ width: 600 }}>
            <Col span={12}>
              <List
                header={<div>All Teams</div>}
                bordered
                dataSource={teams}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>{item.name}</Typography.Text>{" "}
                    {item.description}
                  </List.Item>
                )}
              />
            </Col>
            <Col span={12}>
              <List
                header={<div>All Roles</div>}
                bordered
                dataSource={roles}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>{item.name}</Typography.Text>{" "}
                    {item.description}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </main>

        <footer className={styles.footer}>
          <div className="thrive"></div>
        </footer>
      </div>
    </Content>
  );
});

export async function getServerSideProps() {
  console.log("getStaticProps called...");
  // const resTeams = await fetch(
  //   "https://api.thecatapi.com/v1/images/search?breed_id=beng"
  // );
  // const teams = await resTeams.json();
  // console.log(teams);

  // const resRoles = await fetch("http://127.0.0.1:5000/roles");
  // const roles = await resRoles.json();
  return {
    props: {
      // teams,
      // roles,
    },
  };
}
