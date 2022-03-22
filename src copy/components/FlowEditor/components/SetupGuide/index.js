import React, { useState } from 'react';
import { AccordionDetails, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useToggle } from 'react-use';
import { useMutation, useQuery } from '@apollo/client';
import { StyledAccordion, StyledAccordionSummary, StyledWrapper } from './styled';
import { H5, P16M } from '../../../atoms';
import THEME from '../../../../constants/theme';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import { ExternalLink } from '../../../../pages/FlowDetailsPage/Sidebar/styled';
import ArrowUpRight from '../../../../assets/icons/ArrowUpRight';
import PeopleModal from '../../../modals/PeopleModal';
import { UPDATE_USER_ROLE } from '../../../../utils/queries/users/usersMutations';
import { PEOPLE_PAGE } from '../../../../utils/queries/billing';

const STEPS = [
  {
    title: 'Step 1',
    Description: StepOne,
    links: [
      {
        title: 'Learn more about the No-Code Canvas',
        uri: 'https://documentation.whenthen.com/nocode',
      },
    ],
  },
  {
    title: 'Step 2',
    Description: StepTwo,
    links: [
      {
        title: 'Intent API Documentation',
        uri: 'https://documentation.whenthen.com/intent',
      },
      {
        title: 'Invite Developer',
        redirect: '/settings/directory',
      },
    ],
  },
  {
    title: 'Step 3',
    Description: StepThree,
    links: [
      {
        title: 'Checkout API Documentation',
        uri: 'https://documentation.whenthen.com/instruct/checkout',
      },
      {
        title: 'Invite Developer',
        redirect: '/settings/directory',
      },
    ],
  },
  {
    title: 'Step 4',
    Description: StepFour,
    links: [
      {
        title: 'Payment API Documentation',
        uri: 'https://documentation.whenthen.com/instruct/payments',
      },
      {
        title: 'Invite Developer',
        redirect: '/settings/directory',
      },
    ],
  },
];

const SetupGuide = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(null);
  const [modalOpen, toggleModal] = useToggle();
  const [updateUser] = useMutation(UPDATE_USER_ROLE);
  const { refetch: userRefetch } = useQuery(PEOPLE_PAGE);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : null);
  };

  return (
    <>
      <StyledWrapper position="absolute" width={400} right={32} bottom={84} zIndex={10}>
        <Box p="24px" bgcolor={THEME.primaryColors.white} borderBottom={`1px solid ${THEME.greyColors.grey16}`}>
          <H5>{t('Setup Guide')}</H5>
        </Box>
        {STEPS.map(({ title, Description, links }, index) => (
          <StyledAccordion
            elevation={0}
            expanded={expanded === `step${index}`}
            onChange={handleChange(`step${index}`)}
            key={title}
            square
          >
            <StyledAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`step${index}bh-content`}
              id={`step${index}bh-header`}
            >
              <P16M>{title}</P16M>
            </StyledAccordionSummary>
            <AccordionDetails>
              <Box>
                <Description />
                {links.map((link, linkIndex) => (
                  <Box display="flex" mb={linkIndex === links.length - 1 ? '0' : '4px'}>
                    <ExternalLink
                      href={link.uri}
                      target="_blank"
                      noUnderline
                      fontSize="14px"
                      color="#545A61"
                      {...(link.redirect && { onClick: () => toggleModal() })}
                    >
                      {link?.title}
                      <ArrowUpRight />
                    </ExternalLink>
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </StyledAccordion>
        ))}
      </StyledWrapper>
      <PeopleModal
        open={modalOpen}
        setShowModal={toggleModal}
        userRefetch={userRefetch}
        modalType="add"
        updateUser={updateUser}
      />
    </>
  );
};

export default SetupGuide;
