import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IRootReducer } from 'app/redux/rootReducer';
import * as dayjs from 'dayjs';
import { InformationRow, InformationRowKey } from './styled';
import { formattingByNewLine } from 'app/utils/task';
import { Editable } from 'app/components/Editable';
import { Input, DatePicker, Select } from 'antd';
import { toggleEditMode, updateUser } from 'app/redux/auth/actions';
import { PROGRAMMING_LANGUAGES } from 'app/utils/constants';
import { isCustomer } from 'app/utils/project';

export const About = () => {
  const dispatch = useDispatch();
  const { user, editMode } = useSelector((state: IRootReducer) => state.authReducer);

  const [phone, setPhone] = React.useState(user!.phone);
  const [email, setEmail] = React.useState(user!.email);
  const [dateOfBirth, setDateOfBirth] = React.useState(user!.dateOfBirth);
  const [gender, setGender] = React.useState(user!.gender);
  const [skills, setSkills] = React.useState(user!.skills);
  const [about, setAbout] = React.useState(user!.about);

  const phoneRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const dateOfBirthRef = React.useRef(null);
  const genderRef = React.useRef(null);
  const skillsRef = React.useRef(null);
  const aboutRef = React.useRef(null);

  React.useEffect(() => {
    // component will unmount
    return () => {
      dispatch(toggleEditMode(false));
    };
  }, []);

  const onChangePhone = () => {
    if (phone !== user!.phone) {
      dispatch(updateUser.started({ phone }));
    }
  };

  const onChangeEmail = () => {
    if (email !== user!.email) {
      dispatch(updateUser.started({ email }));
    }
  };

  const onChangeDateOfBirth = () => {
    const dateOfBirthValue = dayjs(+dateOfBirth).valueOf().toString();
    if (dateOfBirth !== dateOfBirthValue) {
      dispatch(updateUser.started({ dateOfBirth: dateOfBirthValue }));
    }
  };

  const onChangeGender = (gender: string) => {
    setGender(gender);
    setTimeout(() => {
      dispatch(updateUser.started({ gender }
      ));
    }, 500);
  };

  const onChangeSkills = () => {
    if (skills !== user!.skills) {
      dispatch(updateUser.started({ skills }));
    }
  };

  const onChangeAbout = () => {
    if (about !== user!.about) {
      dispatch(updateUser.started({ about }));
    }
  };

  // @ts-ignore
  const datePicker = <DatePicker ref={dateOfBirthRef} value={dayjs(+dateOfBirth)} onChange={setDateOfBirth} style={{ width: '100%', height: 26 }} />;

  return (
    <div>
      <h5 style={{ margin: 0, marginBottom: 16, color: '#969FAA' }}>CONTACT INFORMATION</h5>
      <InformationRow>
        <InformationRowKey>Phone:</InformationRowKey>
        <Editable
          childRef={phoneRef}
          canEdit={editMode}
          type="input"
          placeholder="N/A"
          text={user!.phone}
          onEndEditing={onChangePhone}
        >
          <Input
            ref={phoneRef}
            type="text"
            name="phone"
            value={phone}
            style={{ maxWidth: '100%', fontSize: 14 }}
            size="small"
            onChange={e => setPhone(e.target.value)}
          />
        </Editable>
      </InformationRow>
      <InformationRow>
        <InformationRowKey>E-mail:</InformationRowKey>
        <Editable
          childRef={emailRef}
          canEdit={editMode}
          type="input"
          placeholder="N/A"
          text={user!.email}
          onEndEditing={onChangeEmail}
        >
          <Input
            ref={emailRef}
            type="text"
            name="email"
            value={email}
            style={{ maxWidth: '100%', fontSize: 14 }}
            size="small"
            onChange={e => setEmail(e.target.value)}
          />
        </Editable>
      </InformationRow>

      <h5 style={{ margin: 0, marginTop: 16, marginBottom: 16, color: '#969FAA' }}>BASIC INFORMATION</h5>
      <InformationRow>
        <InformationRowKey>Birthday:</InformationRowKey>
        <Editable
          childRef={dateOfBirthRef}
          canEdit={editMode}
          type="input"
          placeholder="N/A"
          text={dateOfBirth ? dayjs(+dateOfBirth).format('MMM DD, YYYY') : 'N/A'}
          onEndEditing={onChangeDateOfBirth}
        >
          {datePicker}
        </Editable>
      </InformationRow>
      <InformationRow>
        <InformationRowKey>Gender:</InformationRowKey>
        <Editable
          childRef={genderRef}
          canEdit={editMode}
          type="select"
          placeholder="N/A"
          text={user!.gender}
          style={{ textTransform: 'capitalize' }}
        >
          <div>
            <Select
              ref={genderRef} 
              value={gender} 
              style={{ width: 200 }}
              onSelect={onChangeGender}
              placeholder="Select gender"
            >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
            </Select>
          </div>
        </Editable>
      </InformationRow>
      {!isCustomer(user!) && 
        <InformationRow>
          <InformationRowKey>Skills:</InformationRowKey>
          <Editable
            childRef={skillsRef}
            canEdit={editMode}
            type="textarea"
            placeholder="N/A"
            text={user!.skills.map(skill => <p key={skill} style={{ margin: 0 }}>{skill}</p>)}
            onEndEditing={onChangeSkills}
          >
            <Select
              ref={skillsRef}
              value={skills}
              mode="multiple"
              placeholder="Select languages"
              size="middle"
              showSearch={false}
              style={{ maxWidth: 500 }}
              onChange={(items) => setSkills(items)}
            >
              {PROGRAMMING_LANGUAGES.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
            </Select>
          </Editable>
        </InformationRow>
      }
      <InformationRow>
        <InformationRowKey>About:</InformationRowKey>
        <Editable
          childRef={aboutRef}
          canEdit={editMode}
          type="textarea"
          placeholder="N/A"
          text={user!.about && <div>{formattingByNewLine(user!.about)}</div>}
          onEndEditing={onChangeAbout}
          style={{ width: '100%' }}
        >
          <Input.TextArea
            ref={aboutRef}
            name="about"
            value={about}
            style={{ maxWidth: '100%', fontSize: 14 }}
            autoSize
            onChange={e => setAbout(e.target.value)}
          />
          </Editable>
      </InformationRow>
    </div>
  );
};