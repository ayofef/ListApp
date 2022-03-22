import { gql } from '@apollo/client';

const paymentData = gql`
  fragment paymentData on PaymentInsightsDetails {
    total {
      formattedAmount
      rawAmount
    }
    currency
    countTotal
    intervals {
      interval {
        start
        end
      }
      total {
        formattedAmount
        rawAmount
      }
    }
  }
`;

export const GET_MAIN_INSIGHTS_SUBQUERY = (key) => gql`
  query getDashboardInsights( $intervalSize: Int!,  $data: PaymentFilterInput) {
    getDashboardInsights( intervalSize: $intervalSize, data: $data) {
      ${key} {
        ...paymentData
      }
    }
}
${paymentData}
`;

export const GET_BYVALUE_INSIGHTS_SUBQUERY = (key) => gql`
  query getDashboardInsights( $intervalSize: Int!,  $data: PaymentFilterInput) {
    getDashboardInsights( intervalSize: $intervalSize, data: $data) {
      byValue {
        ${key}{
          total  {
            formattedAmount
            rawAmount
          }
          countTotal
          currency
          intervals {
            interval {
              start
              end
            }
            total {
              formattedAmount
              rawAmount
            }
            count
          }
        }
      }
    }
}
`;

export const GET_INSIGHTS_DETAILS = (key) => {
  if (key === 'declined') {
    return gql`
      query getDashboardInsights($intervalSize: Int!, $data: PaymentFilterInput) {
        getDashboardInsights(intervalSize: $intervalSize, data: $data) {
          processorsStats
          methodsStats
          countryStats
          issuingStats
          declineCodeStats
          cardTypeStats
          cardCategoryStats
          productTypeStats
          feeStats
          byValue {
            declined {
              total {
                formattedAmount
                rawAmount
                currency
              }
              currency
              countTotal
              intervals {
                interval {
                  start
                  end
                }
                total {
                  formattedAmount
                  currency
                  rawAmount
                }
                count
              }
            }
          }
        }
      }
    `;
  }

  if (key === 'failed') {
    return gql`
      query getDashboardInsights($intervalSize: Int!, $data: PaymentFilterInput) {
        getDashboardInsights(intervalSize: $intervalSize, data: $data) {
          processorsStats
          methodsStats
          countryStats
          issuingStats
          cardTypeStats
          cardCategoryStats
          productTypeStats
          feeStats
          failed {
            total {
              rawAmount
              currency
              formattedAmount
            }
            currency
            countTotal
            intervals {
              interval {
                start
                end
              }
              total {
                rawAmount
                currency
                formattedAmount
              }
              count
            }
          }
        }
      }
    `;
  }

  if (key !== 'intents') {
    return gql`
      query getDashboardInsights( $intervalSize: Int!,  $data: PaymentFilterInput) {
        getDashboardInsights( intervalSize: $intervalSize, data: $data) {
          processorsStats
          methodsStats
          countryStats
          issuingStats
          cardTypeStats
          productTypeStats
          cardCategoryStats
          feeStats
          byValue {
            ${key} {
              total { rawAmount currency formattedAmount }
              currency
              countTotal
              intervals {
                interval {
                  start
                  end
                }
                total { rawAmount currency formattedAmount }
                count
              }
            }
          }
        }
      }
    `;
  }
  return gql`
    query getDashboardInsights(
      $intervalSize: Int!
      $activeIntervalSize: Int!
      $inactiveIntervalSize: Int!
      $active: PaymentFilterInput
      $inactive: PaymentFilterInput
      $byValue: PaymentFilterInput
    ) {
      active: getDashboardInsights(intervalSize: $activeIntervalSize, data: $active) {
        byValue {
          intents {
            total {
              rawAmount
              currency
              formattedAmount
            }
            currency
            countTotal
            intervals {
              interval {
                start
                end
              }
              total {
                rawAmount
                currency
                formattedAmount
              }
              count
            }
          }
        }
      }
      inactive: getDashboardInsights(intervalSize: $inactiveIntervalSize, data: $inactive) {
        byValue {
          intents {
            total {
              rawAmount
              currency
              formattedAmount
            }
            currency
            countTotal
            intervals {
              interval {
                start
                end
              }
              total {
                rawAmount
                currency
                formattedAmount
              }
              count
            }
          }
        }
      }
      getDashboardInsights(intervalSize: $intervalSize, data: $byValue) {
        byValue {
          intents {
            total {
              rawAmount
              currency
              formattedAmount
            }
            currency
            countTotal
          }
        }
      }
    }
  `;
};

export const GET_DASHBOARD_INSIGHTS = gql`
  query getDashboardInsights($intervalSize: Int!, $data: PaymentFilterInput, $intervalTypeMonth: Boolean) {
    getDashboardInsights(intervalSize: $intervalSize, intervalTypeMonth: $intervalTypeMonth, data: $data) {
      failed {
        total {
          formattedAmount
          rawAmount
          rawAmount
        }
        currency
        countTotal
        intervals {
          interval {
            start
            end
          }
          total {
            formattedAmount
            rawAmount
            rawAmount
          }
          count
        }
      }
      byValue {
        successful {
          total {
            formattedAmount
            rawAmount
            rawAmount
          }
          currency
          countTotal
          intervals {
            interval {
              start
              end
            }
            total {
              formattedAmount
              rawAmount
              rawAmount
            }
            count
          }
        }

        canceled {
          total {
            formattedAmount
            rawAmount
          }
          currency
          countTotal
          intervals {
            interval {
              start
              end
            }
            total {
              formattedAmount
              rawAmount
            }
            count
          }
        }
        declined {
          total {
            formattedAmount
            rawAmount
          }
          currency
          countTotal
          intervals {
            interval {
              start
              end
            }
            total {
              formattedAmount
              rawAmount
            }
            count
          }
        }
        refunded {
          total {
            formattedAmount
            rawAmount
          }
          currency
          countTotal
          intervals {
            interval {
              start
              end
            }
            total {
              formattedAmount
              rawAmount
            }
            count
          }
        }
        disputed {
          total {
            formattedAmount
            rawAmount
          }
          currency
          countTotal
          intervals {
            interval {
              start
              end
            }
            total {
              formattedAmount
              rawAmount
            }
            count
          }
        }
        refunded {
          total {
            formattedAmount
            rawAmount
          }
          currency
          countTotal
          intervals {
            interval {
              start
              end
            }
            total {
              formattedAmount
              rawAmount
            }
            count
          }
        }
        intents {
          total {
            rawAmount
            currency
            formattedAmount
          }
          currency
          countTotal
          intervals {
            interval {
              start
              end
            }
            total {
              rawAmount
              currency
              formattedAmount
            }
            count
          }
        }
      }
    }
  }
`;

export const GET_LIST_NOTIFICATIONS_SIMPLE = gql`
  query listNotifications {
    listNotifications {
      id
      status
    }
  }
`;

export const GET_LIST_REQUIRES_ACTIONS_SIMPLE = gql`
  query listRequiresAction {
    listRequiresAction {
      id
    }
  }
`;
