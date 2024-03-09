import { Injectable } from '@nestjs/common';
import { PubSub } from '@google-cloud/pubsub';

@Injectable()
export class PubSubService {
  private readonly pubsub: PubSub;
  credentials = {
    type: 'service_account',
    project_id: 'techchallenge-fastfood',
    private_key_id: 'df859c5f62a6f3d3b494abcaf0f666571b510f0a',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9Okyja847H9gY\neqCJRn28dEV6lV1vjBUdxjBVJQ++O/Jhj5s38O9yAoceIVdvrWCUpn7LHC9NBg54\nEcrdameXxTMvf+8HMTJoeroZMpQxODwCq5maETj7YniO2/BOfORrUoVC+3s9MVhT\nPZshdEqFglWEOsxrC8I/+jvIzd+pIM0NsPkHv1HpRB7dymIEsy88xj3/7XHombdI\nbqENMpyBP9uK4PisOxFoaGVNhYhMcQCu4ScsQqi7O/kNakfMN2iYvUoB1T3eXw+T\nJ22g3cncHqLqEeVMI1tnd8sXkRJ+5E58WiTdMuntDszQVaZV14sN1mU4ZKSDu5qL\nYAITnjwjAgMBAAECggEAXNHDFApmj+Pv6RoFszCLrqxOBHJN8dCB7yfvP2S9ky/u\nleKOXeNmYMNSqfnq3NHr5R7CZTj/DsYgxM7ddryh8fV+RRd5FUsRkeRZctC3lmki\nLqEj6En4bH8B6fmCp81lcit5SMD406xnyfUXKlLT1yd2cTUyXnPXJfDF8Jrj0h53\nHhYpBfhcrkdi/lcCZvexv+9IEEgsVJ2I3S7ieS6k+54ltrAKzEKpWglVnhsrwTxx\nNBJ1DhkaE4Qxt9cnvzv5hrUiaFkIUEsMewRlPUTyxZ68OEZzEo99GAakgZv7MDGc\n6Hemzg4sQyT8G37qQPcn1GcqCPvWAY43CKpJ2zwHKQKBgQDv1tLYUKmX/Ad/NUhS\nCznG3oCOi6dX2TUMWAEbZ6DmB3n/lUNJICENJ3dUkwivRLXPwGg3unFjiHqtC+9Z\n6+xuarPJuRh4fGy2+5LmLjMGmYA4TZEIFuoBaV4fXYrT2n4HElET0VYM4X8zJvwh\nD9ETR2Wwe1CE56T2wlAeXOXwlwKBgQDJ+nBmI6Oc/5ud+unaB87A/v9kbSUKcAW9\nbra1ZyCJDuccn6syHvuz9gAcak5DTHxdPm2F0kTl0s07cQx2xaxjQG9wncJhRZoa\n8FVegrpOl3T//zyJArcvK0+KAe4gB4ec7sXuzEp8P04lm1eEDFGvGbzXPCTYw5fb\ng6ya/Na2VQKBgQDk8cyTcWxzCMKfS92dc9nTXNKbP/Seh1l8TwW/g0y0SK7Mq09v\nnpvuUp42vaSsqopjpufVSsSynrV8OshgrjUjsfetuGMDoMKmab/wumk7A4zCMkkf\nz7/RWSPgDQtY8Fkdpv5+THY4FYm26qADb3XFUYJg1VYniHiQlSylz0gwQQKBgHsb\nOzD2Hf5OSYJz8d8jjSBTDEUgxUfkWYtJlPFiRxFi1Pi8VTM6cT4R/aVUIhmg39hR\neZ3sOHRAFTlawTcPavAf0Qy6C0UQkEpFHDN7yKSoafaykioMTqzgYB2E6af6Du1X\nF6tiNzAdwbroQOJKQ+tO66vgi7DXHpL8YdMhspj1AoGBAJSXsz8S6qhBCsBFgVir\nXEEij25FCKMpV2Ea7RghFTHL+Wwm4kr9duVUfonxQ2Mk7SWnB2PX2feTIeUqZgJ/\nZR5B+44DZumPBCBWGHU8ESiHbNIX+f39ntlo8wpWAmbfgsoIproHy3l8PtPu0jxT\nxyWkCUfA1pvS/HyVS6QbWx4l\n-----END PRIVATE KEY-----\n',
    client_email:
      'tc-techchallenge-user@techchallenge-fastfood.iam.gserviceaccount.com',
    client_id: '100853162722273154971',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/tc-techchallenge-user%40techchallenge-fastfood.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
  };
  constructor() {
    this.pubsub = new PubSub({
      projectId: 'techchallenge-fastfood',
      credentials: this.credentials,
    });
  }

  async publishMessage(topicName: string, data: any): Promise<string> {
    try {
      if (!topicName) {
        throw new Error('Topic name cannot be null or undefined');
      }

      if (!data) {
        throw new Error('Data cannot be null or undefined');
      }

      //Publish message in topic
      const bufferData = Buffer.from(JSON.stringify(data));
      const messageId = await this.pubsub
        .topic(topicName)
        .publishMessage({ data: bufferData });

      return messageId;
    } catch (error) {
      console.error(`Error publishing message: ${error.message}`);
      throw error;
    }
  }

  async subscribe(
    topicName: string,
    messageHandler: (message) => void,
  ): Promise<void> {
    const subscriptionName = topicName;

    const subscription = this.pubsub.subscription(subscriptionName);

    //Listen subscription events
    subscription.on('message', (message) => {
      try {
        messageHandler(message);
        message.ack();
      } catch (error) {
        console.error(`Error processing message: ${error}`);
        message.nack();
      }
    });

    //Handle subscription errors
    subscription.on('error', (error) => {
      console.error(`Subscription error: ${error}`);
    });
  }
}
