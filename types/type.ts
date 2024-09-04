interface Email {
    headers: {
      return_path: string;
      received: string[];
      date: string;
      from: string;
      to: string;
      message_id: string;
      subject: string;
      mime_version: string;
      content_type: string;
      delivered_to: string;
      received_spf: string;
      authentication_results: string;
      user_agent: string;
    };
    envelope: {
      to: string;
      from: string;
      helo_domain: string;
      remote_ip: string;
      recipients: string[];
      spf: {
        result: string;
        domain: string;
      };
      tls: boolean;
    };
    plain: string;
    html: string;
    reply_plain: string;
    attachments: {
      content: string;
      file_name: string;
      content_type: string;
      size: number;
      disposition: string;
    }[];
    email: string;
    subjectSummary: string;
    loanDetails: {
      loanAmount: number;
      interestRate: number;
      term: string;
    };
    generatedResponse: string;
    eligibilityData: {
      isEligible: boolean;
      reason: string;
    };
    timestamp: string;
  }