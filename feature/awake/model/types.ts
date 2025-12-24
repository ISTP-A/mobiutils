export type DecreaseRuneType = "NONE" | "NORMAL" | "TRANS1" | "TRANS2" | "ETC";

export type TimeValue = number;
export type MinSec = { min: number; sec: number };

export type AwakeFormValues = {
  startTime: MinSec;
  calcType: DecreaseRuneType;
  etcValue: TimeValue;
};
