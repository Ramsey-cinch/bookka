#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BookkaStack } from '../lib/bookka-stack';

const app = new cdk.App();
new BookkaStack(app, 'BookkaStack');
