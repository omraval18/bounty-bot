import { GithubEvent, Handler, ActionHandler } from "../types";
import { commentWithAssignMessage } from "./assign";
import { pricingLabelLogic, validatePriceLabels } from "./pricing";
import { checkBountiesToUnassign, collectAnalytics, checkWeeklyUpdate } from "./wildcard";
import { nullHandler } from "./shared";
import { handleComment } from "./comment";
import { handleIssueClosed } from "./payout";

export const processors: Record<string, Handler> = {
  [GithubEvent.ISSUES_LABELED]: {
    pre: [validatePriceLabels],
    action: [pricingLabelLogic],
    post: [nullHandler],
  },
  [GithubEvent.ISSUES_UNLABELED]: {
    pre: [validatePriceLabels],
    action: [pricingLabelLogic],
    post: [nullHandler],
  },
  [GithubEvent.ISSUES_ASSIGNED]: {
    pre: [nullHandler],
    action: [commentWithAssignMessage],
    post: [nullHandler],
  },
  [GithubEvent.ISSUE_COMMENT_CREATED]: {
    pre: [nullHandler],
    action: [handleComment],
    post: [nullHandler],
  },
  [GithubEvent.ISSUE_COMMENT_EDITED]: {
    pre: [nullHandler],
    action: [handleComment],
    post: [nullHandler],
  },
  [GithubEvent.ISSUES_CLOSED]: {
    pre: [nullHandler],
    action: [handleIssueClosed],
    post: [nullHandler],
  },
};

/**
 * @dev The handlers which will run on every event hooked
 */
export const wildcardProcessors: ActionHandler[] = [checkBountiesToUnassign, collectAnalytics, checkWeeklyUpdate];
