import React, { useEffect, useState } from "react";
import { createUser, getTeams, getUsers } from "../API-Service/action";
import { Space, Dropdown, Drawer, Row, Col } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBin7Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import CommonWarningModal from "../Common/CommonWarningModal";
import CommonTable from "../Common/CommonTable";
import "./styles.css";
import CommonInputField from "../Common/CommonInputField";
import CommonButton from "../Common/CommonButton";
import CommonSelectField from "../Common/CommonSelectField";
import {
  emailValidator,
  mobileValidator,
  nameValidator,
  selectValidator,
} from "../Common/Validation";
import { CommonToaster } from "../Common/CommonToaster";

export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [teamId, setTeamId] = useState(null);
  const [teamError, setTeamError] = useState(null);
  const [validationTrigger, setValidationTrigger] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [organizationId, setOrganizationId] = useState(null);
  const columns = [
    { title: "Name", dataIndex: "name", key: "1" },
    { title: "Email", dataIndex: "email", key: "2" },
    { title: "Mobile", dataIndex: "mobile", key: "3" },
    {
      title: "Action",
      dataIndex: "action",
      key: "3",
      render: (text, record) => {
        const items = [
          {
            key: "1",
            label: (
              <div
                style={{ display: "flex" }}
                onClick={() => handleEdit(record)}
              >
                <AiOutlineEdit size={19} />
                <button className="users_tableeditbutton">Edit</button>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <div
                style={{ display: "flex" }}
                onClick={() => {
                  CommonWarningModal({
                    title: (
                      <p style={{ fontWeight: "500", fontSize: "14px" }}>
                        {"Do you want to delete "}
                        <span style={{ fontWeight: "700", fontSize: "16px" }}>
                          {record.name}
                        </span>
                        {" designation"}
                      </p>
                    ),
                    onDelete: () => handleDelete(record.id),
                  });
                }}
              >
                <RiDeleteBin7Line size={19} color="rgb(255, 77, 79)" />
                <button
                  className="users_tableeditbutton"
                  onClick={() => console.log(record)}
                >
                  Delete
                </button>
              </div>
            ),
          },
        ];
        return (
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
                arrow
              >
                <button className="usertable_actionbutton">
                  <BsThreeDotsVertical />
                </button>
              </Dropdown>
            </Space>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    getTeamsData();
  }, []);

  const getTeamsData = async (id) => {
    const payload = {
      ...(id && { id: id }),
    };
    try {
      const response = await getTeams(payload);
      console.log("team response", response);
      setTeamData(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        getUsersData();
      }, 300);
    }
  };

  const getUsersData = async () => {
    const orgId = localStorage.getItem("organizationId");
    setOrganizationId(orgId);
    try {
      const response = await getUsers();
      console.log("user response", response);
      setUsersData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      formReset();
    }
  };

  const handleEdit = (record) => {
    console.log(record);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationTrigger(true);
    const nameValidate = nameValidator(name);
    const emailValidate = emailValidator(email);
    const mobileValidate = mobileValidator(mobile);
    const teamValidate = selectValidator(teamId);

    setNameError(nameValidate);
    setEmailError(emailValidate);
    setMobileError(mobileValidate);
    setTeamError(teamValidate);

    if (nameValidate || emailValidate || mobileValidate || teamValidate) return;

    const payload = {
      name: name,
      email: email,
      mobile: mobile,
      teamId: teamId,
      organizationId: organizationId,
    };
    try {
      await createUser(payload);
      getUsersData();
      setTimeout(() => {
        CommonToaster("User created", "success");
      }, 300);
    } catch (error) {
      CommonToaster(error.response.data.message, "error");
    }
  };

  const formReset = () => {
    setOpen(false);
    setValidationTrigger(false);
    setName("");
    setNameError("");
    setEmail("");
    setEmailError("");
    setMobile("");
    setMobileError("");
    setTeamId(null);
    setTeamError("");
  };

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <p className="totalusers_heading">
            Total Users ({" " + usersData.length + " "})
          </p>
        </div>
        <div
          className="col-6"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-primary adduser_button"
            onClick={() => setOpen(true)}
          >
            Add User
          </button>
        </div>
      </div>
      <div className="mt-3">
        <CommonTable
          columns={columns}
          dataSource={usersData}
          checkBox="false"
          size="small"
          className="users_table"
        />
      </div>

      <Drawer title="Add User" onClose={formReset} open={open} width="500px">
        <form>
          <Row gutter={16}>
            <Col span={12}>
              <CommonInputField
                label="Name"
                onChange={(event) => {
                  setName(event.target.value);
                  if (validationTrigger) {
                    setNameError(nameValidator(event.target.value));
                  }
                }}
                mandatory
                value={name}
                error={nameError}
              />
            </Col>
            <Col span={12}>
              <CommonInputField
                label="Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (validationTrigger) {
                    setEmailError(emailValidator(event.target.value));
                  }
                }}
                mandatory
                value={email}
                error={emailError}
              />
            </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: "22px" }}>
            <Col span={12}>
              <CommonInputField
                label="Mobile"
                onChange={(event) => {
                  setMobile(event.target.value);
                  if (validationTrigger) {
                    setMobileError(mobileValidator(event.target.value));
                  }
                }}
                mandatory
                maxLength={10}
                value={mobile}
                error={mobileError}
              />
            </Col>
            <Col span={12}>
              <CommonSelectField
                label="Team"
                options={teamData}
                onChange={(value) => {
                  setTeamId(value);
                  if (validationTrigger) {
                    setTeamError(selectValidator(value));
                  }
                }}
                mandatory
                value={teamId}
                error={teamError}
              />
            </Col>
          </Row>
          <div
            style={{
              marginTop: "22px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CommonButton
              text="Submit"
              type="submit"
              width="110px"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}
