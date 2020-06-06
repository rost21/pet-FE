import * as React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/auth/actions';
import * as dayjs from 'dayjs';
import { Input, Button, Checkbox, Form, Select, DatePicker, Row, Col } from 'antd';
import { LoginFormContainer, FormTitle, FormItem } from './styled';
import { RouteComponentProps } from 'react-router';
import ROUTES from 'app/routes';
import { showNotification } from 'app/utils/notifications';
import { PROGRAMMING_LANGUAGES } from 'app/utils/constants';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

interface IProps extends RouteComponentProps {}

export const RegistrationPage: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const [isCustomer, setIsCustomer] = React.useState(false);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (values.password !== values.confirmPassword) {
      showNotification('Passwords don\'t match', 'error');
      return;
    }
    const { dateOfBirth, prefix } = values;
    const phone = prefix.concat(values.phone);
    delete values.confirmPassword; // delete property confirmPassword
    delete values.prefix; // delete property prefix

    dispatch(actions.registration.started({
      ...values,
      isCustomer,
      phone,
      dateOfBirth: dayjs(dateOfBirth).valueOf().toString()
    }));
  };

  const prefixSelector = (
    <FormItem name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Select.Option value="+38">+38</Select.Option>
        <Select.Option value="+1">+1</Select.Option>
      </Select>
    </FormItem>
  );

  return (
    <LoginFormContainer>
      <img
        src="../../../assets/logo.png"
        width="260"
      />
      <FormTitle>Registration</FormTitle>
      
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '+38',
        }}
        scrollToFirstError
        style={{ marginTop: 10 }}
      >
        <FormItem
          name="email"
          label="E-mail"
          validateTrigger="onSubmit"
          rules={[
            { type: 'email', message: 'The input is not valid E-mail!' },
            { required: true, message: 'Please input your E-mail!' }
          ]}
        >
          <Input />
        </FormItem>

        <FormItem
          name="username"
          label="Username"
          validateTrigger="onSubmit"
          rules={[
            { required: true, message: 'Please input your username!', whitespace: false },
            { min: 6, message: 'Minimum length of login is 6' },
            { max: 20, message: 'Maximum length of login is 20' }
          ]}
        >
          <Input />
        </FormItem>

        <FormItem
          name="password"
          label="Password"
          validateTrigger="onSubmit"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Minimum length of password is 6' }
          ]}
        >
          <Input.Password />
        </FormItem>

        <FormItem
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords that you entered don\'t match!');
              },
            }),
          ]}
        >
          <Input.Password />
        </FormItem>

        <Row
          justify="end"
          gutter={8}
        >
          <Col span={12}>
            <FormItem
              name="firstname"
              label="Firstname"
              rules={[
                { required: true, message: 'Please confirm your firstname!' }
              ]}
            >
              <Input placeholder="Firstname" style={{ width: '80%' }} />
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem
              name="lastname"
              label="Lastname"
              rules={[
                { required: true, message: 'Please confirm your lastname!' }
              ]}
            >
              <Input placeholder="Lastname" />
            </FormItem>
          </Col>
        </Row>

        <FormItem
          name="gender"
          label="Gender"
        >
          <Select placeholder="Select gender" size="middle">
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
          </Select>  
        </FormItem>

        <FormItem
          name="location"
          label="Location"
        >
          <Input placeholder="Example: London, UK" style={{ width: '100%' }} />    
        </FormItem>

        <FormItem
          name="dateOfBirth"
          label="Date of birth"
        >
          <DatePicker style={{ width: '100%' }} />
        </FormItem>

        <FormItem
          name="phone"
          label="Phone Number"
        >
          <Input addonBefore={prefixSelector} type="number" style={{ width: '100%' }} />
        </FormItem>

        <FormItem
          name="isCustomer"
          valuePropName="checked"
          {...tailFormItemLayout}
        >
          <Checkbox checked={isCustomer} onChange={() => setIsCustomer(!isCustomer)}>
            I'm customer
          </Checkbox>
        </FormItem>

        {!isCustomer && (
          <>
            <FormItem
              name="skills"
              label="Select skills"
            >
              <Select
                mode="multiple"
                placeholder="Select languages"
                size="middle"
                showSearch={false}
                style={{ maxWidth: 500 }}
              >
                {PROGRAMMING_LANGUAGES.map(item => <Select.Option key={item} value={item}>{item}</Select.Option>)}
              </Select>
            </FormItem>

            <FormItem
              name="role"
              label="Role"
            >
              <Input placeholder="Example: Fullstack developer" />
            </FormItem>
            </>
          )}

        <FormItem
          name="about"
          label="About you"
        >
          <Input.TextArea placeholder="About" autoSize={{ maxRows: 4 }}/>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
          <div style={{ marginTop: 8 }}>Or <a onClick={() => props.history.push(ROUTES.LOGIN)}>back to login</a></div>
          </>
        </FormItem>
        
      </Form>
    </LoginFormContainer>
  );
};