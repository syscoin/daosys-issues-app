/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { store, get } from 'renderer/API/AppStore';

export enum SettingsFieldType {
  textInput,
  checkBox,
}

export type SettingFieldProps = {
  label: string;
  description: string;
  storageKey: string;
  typeOfField: SettingsFieldType;
};

export const SettingField: FC<SettingFieldProps> = ({
  label,
  description,
  storageKey,
  typeOfField,
}) => {
  const [fieldValue, setFieldValue] = useState<string | number>('');

  const updateStorageValue = (newValue: string | number) => {
    store(storageKey, newValue);
    setFieldValue(newValue as string);
  };

  useEffect(() => {
    get(storageKey)
      .then((res) => {
        if (res !== null) {
          return setFieldValue(res);
        }
        return null;
      })
      .catch((error) => {
        console.warn('error when reading data from storage');
        console.warn(error);
      });
  }, [storageKey]);

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col xs={4} md={4} lg={4}>
              {label}
            </Col>
            <Col xs={8} md={8} lg={8}>
              {description}
            </Col>
          </Row>
          {typeOfField === SettingsFieldType.textInput && (
            <>
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <input
                    onChange={(e) => {
                      if (e.target.value.length > 0) {
                        updateStorageValue(e.target.value);
                      }
                    }}
                    value={fieldValue}
                    type="text"
                    className="form-control"
                    placeholder="Property value"
                  />
                </Col>
              </Row>
            </>
          )}

          {typeOfField === SettingsFieldType.checkBox && (
            <>
              <Row>
                <Col xs={4} md={4} lg={4}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      id={`${storageKey}-control`}
                      checked={fieldValue === 1}
                      onChange={(e) => {
                        updateStorageValue(e.target.checked ? 1 : 0);
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${storageKey}-control`}
                    >
                      Enabled
                    </label>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
      </Card>
    </>
  );
};
