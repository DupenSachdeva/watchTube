import express, { Request } from 'express';

export interface request extends Request{
    userId :number
}
