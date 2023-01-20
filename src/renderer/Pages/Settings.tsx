import React, { FC } from 'react';
import { Card } from 'react-bootstrap';
import {
  SettingField,
  SettingFieldProps,
  SettingsFieldType,
} from '../Components/SettingField';

const settingsList: SettingFieldProps[] = [
  {
    label: 'Use CLI access',
    description:
      "CLI access provides more decentralized way to manage issues. You don't need to query external API endpoints which can be centralized.",
    storageKey: 'use-cli',
    typeOfField: SettingsFieldType.checkBox,
  },
  {
    label: 'External HTTP API Url',
    description: 'Http api server which is compatible with radicle-http',
    storageKey: 'radicle-http-url',
    typeOfField: SettingsFieldType.textInput,
  },
];

export const Settings: FC = () => {
  return (
    <Card>
      <Card.Header>Application settings</Card.Header>
      <Card.Body>
        <p>List of application settings.</p>

        <hr />

        {settingsList.map((value) => {
          return (
            <SettingField
              key={value.storageKey}
              label={value.label}
              description={value.description}
              storageKey={value.storageKey}
              typeOfField={value.typeOfField}
            />
          );
        })}
      </Card.Body>
    </Card>
  );
};
