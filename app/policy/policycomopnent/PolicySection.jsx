import React, { useEffect, useState } from "react";
import { Inter, Mulish } from "next/font/google";

const inter700 = Inter({ subsets: ["latin"], weight: "700" });
const mulish700 = Mulish({ subsets: ["latin"], weight: "700" });

export default function Policybox() {
  const [scrollTarget, setScrollTarget] = useState("");
  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "auto" });
    }
  };
  useEffect(() => {
    const handleSmoothScroll = () => {
      const hash = window.location.hash;
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "auto" });
      }
    };

    if (window.location.hash) {
      handleSmoothScroll();
    }
  }, []);
  return (
    <div className="pt-[20px] pb-[100px] w-full">
      <div className="xl:w-[1140px] lg:w-[960px] md:w-[720px] md:pt-[70px] md:px-[15px] pt-[30px] px-[20px] mx-auto ">
        <div className="flex flex-wrap mx-[-15px]">
          <div className="px-[15px] xl:w-[285px] lg:w-[240px] md:w-[190px]">
            <ul>
              <li
                className={`${mulish700.className} mb-[15px] text-[18px] leading-[23px] tracking-wide cursor-pointer`}
                onClick={() => {
                  setScrollTarget("scrollHere1");
                  smoothScrollTo("scrollHere1");
                }}
              >
                Privacy Policy
              </li>
              <li
                className={`${mulish700.className} mb-[15px] text-[18px] leading-[23px] tracking-wide cursor-pointer`}
                onClick={() => {
                  setScrollTarget("scrollHere2");
                  smoothScrollTo("scrollHere2");
                }}
              >
                Terms of Services
              </li>
              <li
                className={`${mulish700.className} mb-[15px] text-[18px] leading-[23px] tracking-wide cursor-pointer`}
                onClick={() => {
                  setScrollTarget("scrollHere3");
                  smoothScrollTo("scrollHere3");
                }}
              >
                Refund Policy
              </li>
            </ul>
          </div>
          {/* privacy policy start */}
          <div className="px-[15px] xl:w-[855px] lg:w-[720px]  md:w-[530px] text-justify lg:text-left">
            <div id="scrollHere1" className="mb-[50px] ">
              <p className="mb-[24px]">&nbsp;</p>
              <h4
                className={`${mulish700.className} text-[26px] text-[#000000]`}
              >
                Freelance Privacy Policy
              </h4>
              <p className="mb-[24px]"></p>
              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                {" "}
                1.Introduction
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.1. Welcome to Freelance. This policy is a part of our Terms of
                Service. By visiting the Site or using the Apps, you consent to
                our use of your personal information in the ways set out in this
                policy and in our Terms of Use. We take our responsibilities
                under applicable privacy laws and regulations (&quot;Privacy
                Laws&quot;) seriously. We are committed to respecting the
                privacy rights and concerns of all Users of our Site.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.2. We recognize the importance of the personal data you have
                entrusted to us and believe that it is our responsibility to
                properly manage, protect and process your personal data. This
                Privacy Policy (“Privacy Policy” or “Policy”) is designed to
                assist you in understanding how we collect, use, disclose and/or
                process the personal data you have provided to us and/or we
                possess about you, whether now or in the future, as well as to
                assist you in making an informed decision before providing us
                with any of your personal data. If you have any questions
                regarding this information or our privacy practices, please
                contact us.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.3. By using the Services, registering for an account with us,
                visiting our website, or accessing the Services, you acknowledge
                and agree that you accept the practices, requirements, and/or
                policies outlined in this Privacy Policy, and you hereby consent
                to us collecting, using, disclosing and/or processing your
                personal data as described herein. We may revise this Privacy
                Policy but the most current version will always be at this link
              </p>
              <p className="mb-[24px]">&nbsp;</p>
              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                2.Information collected or received
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.1 To use our platform to transact, you will need to provide us
                with a valid email address. Depending on the services you
                choose, we may collect additional information, for example: If
                you are a seller, we will collect additional information such as
                payment information, contact number and an address. Please note
                that for security and performance reasons, such content may need
                to be accessed by internal personnel from time to time
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.2 Your username is publicly displayed. Other people may see
                the date you joined; ratings, reviews and related photos for
                items/services you are selling or have sold; your profile
                information; items/services you listed for sale; your business
                pages
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.3 We use technologies such as cookies, clear gifs, log files
                and flash cookies for several purposes, including to help
                understand how you interact with our site and services, in order
                to provide a better experience. The information we collect may
                include, without limitation, your Internet Protocol (IP)
                address, computer/mobile device operating system and browser
                type, type of mobile device, the characteristics of the mobile
                device, the address of a referring web site (if any), and the
                pages you visit on our website and mobile applications and the
                times of visit
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.4 We automatically receive and record information (for
                example: an email address or IP address, cookies, and data)
                about a person who is not yet registered in connection with
                certain features.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.5 We may contact individual business owners to confidentially
                request more information about their services or items listed on
                the Site, or to ensure compliance with our rules and applicable
                law.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.6 When you connect to us or register an account using external
                third-party applications or services, such as Facebook, using an
                application programming interface (API), you will be granting us
                permission to receive information from these third-party
                applications. You can also choose to share some of your activity
                to certain social media networks which are connected to your
                account
              </p>
              <p className="mb-[24px]">&nbsp;</p>
              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                3. Uses and Sharing
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.1 We respect your privacy. We will not sell or disclose your
                your name, email address or other personal information to third
                parties without your consent, except as specified in our Privacy
                Policy.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.2 We generally use the information to provide and improve our
                services and products, for billing and payments, for
                identification and authentication, for targeted online and
                offline marketing, to contact members or interested parties, and
                for general research and aggregate reporting. For example, we
                could use your feedback to improve our services; we use data
                analytics and work with certain third-party service providers
                for targeted online and offline marketing; and of course, we use
                your email address to communicate with you. We also partner with
                service providers and other third parties that collect, use,
                promote, and analyse information about our marketplace.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.3 As part of the buying and selling process, we will
                facilitate the sharing of information between the two users
                involved in the transaction, such as the other buyer’s email
                address. By making a sale or a purchase on Freelance you are
                directing us to share your information in this way. We expect
                you to respect the privacy of the member whose information you
                received. Your ability to use this information extend to all
                Freelance related communication or for any transaction related
                communications. You have not be granted the ability to use the
                information for unsolicited commercial messages or unauthorised
                transactions. Without express consent from that person, you must
                not add any user to your email or physical mailing list or
                misuse any user’s personal information.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.4 We may use your information to contact you. Primarily, these
                messages are delivered by email or by push notifications, and
                every account is required to keep a valid email address on file
                to receive messages. We may contact you by telephone to provide
                support or for transaction related purpose.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.5 Some messages from us are service-related and required for
                users. Examples of service-related messages include an email
                address confirmation/welcome email when you register your
                account, notification of an order, and correspondence with the
                site.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.6 We may release your personal information to a third party in
                the following circumstances: to protect, establish, or exercise
                our legal rights or defend against legal claims or that such
                disclosure is necessary to comply with the law, such as
                investigations into illegal activities.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.7 We may share demographic information with business partners,
                but it will always be aggregated and anonymised, so
                personally-identifiable information is not revealed.
              </p>
              <p className="mb-[24px]">&nbsp;</p>
              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                4. Community
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                4.1 We are both a marketplace and a community. We offer several
                feature that allow users to communicate in public such as
                reviews or private means such as contacting the seller. Please
                use common sense and good judgment when posting or sharing your
                personal information with others. Be aware that any personal
                information you submit there can be read, collected, or used by
                others, or could be used to send you unsolicited messages. You
                are responsible for the personal information you choose to post.
              </p>
              <p className="mb-[24px]">&nbsp;</p>
              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                5. Security
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                5.1 The security of your personal information is important to
                us. Your account information is protected by a password. It is
                important that you protect against unauthorised access to your
                account and information by choosing your password carefully, and
                keeping your password and computer secure, such as by signing
                out after using our services.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                5.2 We encrypt sensitive information (such as credit card
                numbers) using secure socket layer technology (SSL) which is
                then handled by our payment processing partners. All payments
                are escrowed. We follow generally accepted industry standards to
                protect the personal information submitted to us, both during
                transmission and once we receive it. Your payment information is
                safe even from us.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                5.3 Unfortunately, no method of transmission over the Internet,
                or method of electronic storage, is 100% secure. Therefore,
                while we strive to protect your personal information, we
                can&apos;t guarantee its absolute Security.
              </p>
              <p className="mb-[24px]">&nbsp;</p>
              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                6. Data Retention
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                6.1 We will retain your information only for as long as is
                needed to provide you services. If you no longer want us to use
                your information to provide you services, you may close your
                account. We will retain and use your information to the extent
                necessary to comply with our legal obligations, resolve
                disputes, and enforce our agreements.
              </p>
              <p className="mb-[24px]">&nbsp;</p>
              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                7. Changin Data
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                {" "}
                7.1 As a user, you can access, correct, change, and delete
                certain personal information associated with your account by
                visiting your account settings.
              </p>
            </div>
            {/* privacy policy end*/}
            {/* term of services start */}
            <div id="scrollHere2" className="mb-[50px]">
              <h4
                className={`${mulish700.className} text-[26px] text-[#000000]`}
              >
                Freelance Terms of Services
              </h4>
              <p className="mb-[24px]"></p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                1. Intro
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.1 Welcome to the Freelance platform (the &apos;Site&apos;).
                We&apos;ll refer to our website and other services as our
                &quot;Services&quot;, and Freelance will be addressed individually
                or collectively as &quot;Freelance&quot;, &quot;we&quot;,
                &quot;us&quot;, or &quot;our&quot;. Do read through the
                following Terms of Service carefully before using the Site or
                any of our Services. By browsing our Site, you&apos;ll be
                agreeing to our Terms. The Terms are here for you, so that you
                are aware of your legal rights when using our services.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.2 This document and any documents referred to within it will
                collectively make up the &apos;Terms of Services.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.3 Our &quot;Services&quot; include (a) the site, (b) the
                services provided by the site, (c) all information, linked
                pages, features, data, text, images, photographs, graphics,
                music, sounds, video, messages, tags, content, programming,
                software, application services. Any new features added to or
                augmenting the Services are also subject to these Terms of
                Service. Content that is posted by Users using our Services will
                be &quot;Your Content&quot;. Your Content includes your
                usernames, business names, profile pictures, listing photos,
                listing description, reviews, comments, videos etc.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.4 Our services include an online platform service that
                provides a place and opportunity for the sale of professional
                services between the client (&quot;Buyer&quot;) and the
                professional (&quot;Seller&quot;), collectively known as
                &quot;Users&quot; or &quot;Parties&quot;. The actual contract
                for a transaction is directly between the Buyer and the Seller.
                We are not a party to that contract or any other contract
                between Buyer and Seller. Parties to the transaction will be
                entirely responsible for the contract between them in accordance
                to the listing of services and the like. As such, We accept no
                obligations in connection to these contracts. However, if you
                have problems with your order, we may step in to help (refer to
                section 10). We pre-screen sellers to verify identity but not
                any of Your Content. We cannot ensure that Users will actually
                complete a transaction.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.5 We reserve the right to change, modify, suspend or
                discontinue all or any part of this Site or Services at any
                time. We may release certain Services or their features while
                they are still considered to be a beta version, which may not
                work correctly or in the same way as how the final version may
                work, and cannot be held liable in such instances. We may also
                impose limit on certain features or restrict your access to
                parts of, or the entire Site or Service at our sole discretion
                without notice or liability.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.6 We reserve the right to refuse to provide you access to the
                Site or Service or to allow you to open an Account for any
                reason.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                2. Privacy
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.1 We know your personal information is important to you, so
                it&apos;s important to us. Our Privacy policy details how your
                information is used when you use our Services. When using our
                Services or providing information on the site, you consent to
                Our collection, use, disclosure, and processing of Your Content
                and personal data as described in the Privacy Policy.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.2 Users in possession of another User&apos;s personal data
                obtained through the use of the Services hereby agree that, they
                will (a) comply with all applicable personal data protection
                laws, (b) allow User (owner of personal data) the right to
                remove their collected data from User (receiver of personal
                data) from the database upon request.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                3. Your Account
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.1 You&apos;ll need to create an account with Us to use some of
                our Services. Here are a few rules about accounts with Us.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.1.1 You must be 18 or older to use our Service. Otherwise you
                may only use our Services under the supervision of a parent or
                legal guardian.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.1.2 Be honest with us, and provide accurate information about
                yourself. It&apos;s not OK to use false information or
                impersonate another person or company through your account.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.1.3 You are responsible for your account. You&apos;re solely
                responsible for any activity on your account. If you&apos;re
                sharing an account with other people, then the person&apos;s
                name on the account will be ultimately be responsible for all
                activity. If you&apos;re registering as a business entity, you
                personally guarantee that you have the authority to agree to the
                Terms on behalf of the business. Also, your accounts are not
                transferable.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.1.4 As we&apos;ve mentioned above, you&apos;re solely
                responsible for any activity on your account, so remember to
                keep your login and password secure.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                4. Limited License
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                4.1 We grant you a limited and revocable license to access and
                use our Services, subject to our Terms of Service. All
                proprietary Content, trademarks, service marks, brand names,
                logos and other intellectual property displayed in the Site are
                the property of Freelance and where applicable, third parties
                proprietors identified in the Site. You agree not to copy,
                distribute, republish, mirror, frame or create derivative works
                without our prior written consent.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                5. Your Content
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                5.1 Content that you post using our Services is your content.
                This includes usernames, business names, profile pictures,
                listing photos, listing descriptions, reviews, comments, video,
                etc.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                5.1.1 You are solely responsible for Your Content. You represent
                that you have all necessary rights to Your Content and
                you&apos;re not infringing or violating any third party&apos;s
                rights by posting it.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                5.1.2 Posting Your Content through our Services, you grant us a
                license to use it. This license allows us a non-exclusive,
                worldwide, royalty-free, irrevocable, sub-licensable, perpetual
                license to use, display, edit, modify reproduce, distribute,
                store and prepare derivative works of Your Content to promote
                the Services or our Site. We do not claim ownership to Your
                Content, but we have your permission to use it to help us
                function and grow.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                5.1.3 If content that you own or have rights to has been posted
                to the Services without your permission and you want it removed,
                please contact us. If Your Content infringes another
                person&apos;s intellectual property, we will remove it if we
                receive proper notice.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                5.1.4 You agree to not post any content that is abusive,
                threatening, defamatory, obscene, vulgar or otherwise offensive
                or in violation of our Prohibited Items/Services section. You
                also agree not to post any content that is false, misleading or
                uses the Services in a manner that is fraudulent or deceptive.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                6. Your Use of Our Services
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                6.1 We grant you a limited, non-exclusive, non-transferable and
                revocable license to use our Services. You agree that you will
                not violate any laws in connection with your use of the
                Services. This includes any local, state, federal and
                international laws that may apply to you.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                6.2 You are responsible for paying all fee that you may owe to
                us. You are also solely responsible for collection and/or paying
                any applicable taxes for any purchases or sales you make through
                our Services.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                6.3 You agree not to attempt to obtain source code of the
                services. You agree to not interfere with or disrupt/harm our
                services.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                6.4 Violations of this policy may result in a range of actions,
                including any or all of the following: listing deletion, account
                suspension or legal action; if necessary.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                6.5 If you believe a User on our Site is violating these terms,
                please contact us.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                7. Purchase and Payment
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                7.1 Payments are processed through third-party payment channels
                and may vary depending on the jurisdiction you are in. All
                payments are escrowed.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                7.2 All sales on the platform are binding. The seller is
                obligated to complete the transaction with the buyer in a prompt
                manner unless an exceptional circumstance arises.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                8. Seller Commission
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                8.1 The seller of any service will pay us a commission on the
                total transaction amount received by the seller (including
                taxes, if any and shipping costs for any of the transactions
                made on our Site).
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                8.2 Our commission will be deducted directly from your funds
                before the funds are settled into your account.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                8.3 All third-party payment channels will charge you an
                additional fee for payment processing. This fee will be
                dependent on your location as well as your buyer&apos;s
                location. All payment processing fees will not be included in
                seller commission that we charge.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                9. Seller&apos;s Responsibilities
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                9.1 Sellers will properly manage and ensure that relevant
                information such as the price and the details of items,
                services, projects are provided and will not post inaccurate or
                misleading information.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                9.2 The pricing of services for sale are determined by the
                Seller at his/her own discretion. The price of a service or
                delivery cost (if applicable) will include any additional
                charges such as sales tax, value-added tax, tariffs etc. Sellers
                will not charge Buyer such amounts additionally and separately.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                9.3 Sellers are obligated to deliver project/services as
                described in a prompt manner, unless there is an exceptional
                circumstance. If there is any exceptional circumstance the
                seller is obliged to contact the Buyer to inform them of any
                delays or inability to complete the transaction.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                9.4 Sellers will issue additional receipts, credit card slips or
                tax invoices to Buyer on request.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                10. Disputes
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10.1 Freelance is not responsible for disputes in transactions that
                result from interactions outside the platform.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10(a)&nbsp;Disputes with Other Users
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10a.1 If you find yourself in a dispute with another user of our
                Services or a third party, we encourage you to contact the other
                party and try to resolve the dispute amicably.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10a.2 Should you be unable to resolve the dispute between you
                and another user, we may step in to help resolve the dispute. If
                you would like us to get involved, please contact us. We will
                help in good faith based on our policies. However, we will not
                make judgments regarding legal issues or claims.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10a.3 Whether you are a Buyer or a Seller of a service, you must
                cooperate with us throughout the dispute resolution process. We
                ask that you provide all information relating to the dispute
                that we request for. Such requests will be directed to your
                designated email address. If we are unable to get a response
                from you we may close the investigation or determine that the
                investigation has been resolved in favour of the other party.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10(b)&nbsp;Disputes as a Buyer
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10b.1 You may raise two types of disputes, one where the
                &apos;service is not delivered&apos; and the seller is not
                responding to any of your attempts to communicate. The second
                type of dispute is where the &apos;service significantly
                deviates from the deliverables and the milestones agreed between
                both parties&apos;.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10b.2 If you have received a refund/exchange from the seller,
                you may not report that transaction.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10b.3 If the &apos;service is not delivered&apos;, we will ask
                the seller to provide proof of delivery that can be tracked
                online. If the seller fails to do so, we will resolve the
                dispute in your favour.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10b.4 If the &apos;service significantly deviates from the
                deliverables and the milestones agreed between both
                parties&apos;, and both parties cannot agree as to the
                difference between the service that was sold and what was
                described, we will make a fair decision based on all the
                information we hold about the service. We will exercise our
                decision-making authority based on numerous factors, which
                include the description of the service at the point of purchase,
                communications between you and the seller as well as any
                documentation provided. All decisions made by us are final.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10(c)&nbsp;Disputes as a Seller
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10c.1 As a seller, we encourage you to communicate actively with
                your buyer especially if there are any exceptional
                circumstances. We encourage you to be prompt in responding to
                your Buyers in order to avoid any unnecessary disputes.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10c.2 For &apos;services that are not delivered&apos; we will
                contact you to request for proof of delivery. The documentation
                must clearly show that you have rendered the service to the
                buyer. The documentation must be able to be tracked online
                showing the date the service was delivered and the status update
                that the service was delivered (buyer&apos;s acceptance). This
                is the only evidence that we will accept as proof of delivery.
                If proof of delivery cannot be provided then we may resolve the
                dispute in favour of the buyer.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                10c.3 For &apos;service significantly deviates from the
                deliverables and the milestones agreed between both
                parties&apos; disputes, we will be reviewing the service
                description that were provided at the time of purchase. If both
                parties cannot agree as to the difference between the service
                that was sold and what was described, we will make a fair
                decision based on all the information we hold about the service.
                We will exercise our decision-making authority based on numerous
                factors, which include the description of the service at the
                point of purchase, communications between you and the buyer as
                well as any documentation provided. All decisions made by us are
                final.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                11. Disputes with Us
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                11.1 If you are upset with us, please let us know and hopefully
                we can resolve your issue. If we are unable to resolve the
                issue, these rules will govern any legal dispute involving our
                Services:
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                11.1.1 Governing Law. The Freelance local laws govern the Terms of
                Service. The local laws are dependent on the location of
                incorporation. These laws will then apply no matter where in the
                world you live.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                11.1.2 You agree that any dispute or claim arising from the
                Terms will be settled by arbitration where possible. Judgment on
                the arbitration award may be entered in any court that has
                jurisdiction. Any arbitration under the Terms will take place on
                an individual basis: class arbitrations and class actions are
                not permitted. Any decisions made by the arbitrator will be
                deemed final.
              </p>

              <p className="mb-[24px]">&nbsp;</p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                12. Changes to the Terms
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                12.1 We are constantly updating and improving the Service to try
                and find ways to provide you with new and innovative features
                and services. Improvements and updates are also made to reflect
                changing technologies, tastes, behaviours and the way people use
                the Internet and our Service.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                12.2 We may revise the Terms of Service but the most current
                version will always be at this link.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                12.3 We will try, where possible and reasonable, to contact you
                to let you know about significant changes to any of the
                documents referred to in these Terms of Service. We may make
                contact through the system or via a separate email.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                12.4 The current version of the Terms of Service contains the
                only terms that apply to our relationship with you. Older
                versions of the Terms of Service will no longer apply to our
                relationship and will be completely replaced by the current
                version.
              </p>

              <p
                className={`text-base text-[#ADADAD] mb-[24px] ${inter700.className} tracking-wide`}
              >
                13. Contact, feedback and complaints.
              </p>

              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                If you need to contact us please click on contact us for our
                contact details. We value hearing from our users, and are always
                interested in learning about ways we can improve the Service. By
                providing your feedback you agree that you are giving up any
                rights you have in your feedback so that we may use and allow
                others to use it without any restriction and without any payment
                to you
              </p>
            </div>
            {/* term of services end */}
            {/* refund policy start */}
            <div className="mb-[50px]" id="scrollHere3">
              <h4
                className={`${mulish700.className} text-[26px] text-[#000000]`}
              >
                Freelance Refund Policy
              </h4>
              <p className="mb-[24px]"></p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1. Application for Refunds
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.1 Subject to the terms and conditions in this Refund Policy
                and the Terms of Service, Buyer may apply for refund for a
                service purchased on Freelance.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.2 Before you apply for a refund with us, we encourage you to
                contact the other party and try to resolve the dispute amicably.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.3 As a Buyer, you may apply for a refund in two cases. One,
                where the &apos;service is not delivered&apos;. Two, where the
                &apos;service significantly deviates from the deliverables and
                the milestones agreed between both parties&apos;.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.3.1 &apos;Service is not delivered&apos; is when the Buyer has
                not received the completed project or service within a
                reasonable timeframe.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.3.2 &apos;Service significantly deviates from the deliverables
                and milestones agreed between both parties&apos; is defined as
                when Seller has delivered a service that does not match the
                agreed deliverables and milestones to Buyer. Or, The Service
                delivered to Buyer is different from the description agreed to
                by Seller in the agreement between both parties.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                1.4 Buyer may not apply for a refund due to a change of mind.
              </p>
              <p className="mb-[24px]">&nbsp;</p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2. Disputes
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.1 As a Buyer
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.1.1 If you have received a refund/exchange from the seller,
                you may not report that transaction.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.1.2 If the &apos;service is not delivered&apos; we will ask
                the seller to provide proof of delivery that can be tracked
                online. If the seller fails to do so, we will resolve the
                dispute in you favour.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.1.3 If the &apos;service significantly deviates from the
                deliverables and the milestones agreed between both
                parties&apos;, and both parties cannot agree as to the
                difference between the service that was sold and what was
                described, we will make a fair decision based on all the
                information we hold about the service. We will exercise our
                decision-making authority based on numerous factors, which
                include the description of the service at the point of purchase,
                communications between you and the seller as well as any
                documentation provided. All decisions made by us are final.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.2 Disputes as a Seller
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.2.1 As a seller, we encourage you to communicate actively with
                your buyer especially if there are any exceptional
                circumstances. We encourage you to be prompt in responding to
                your Buyers in order to avoid any unnecessary disputes.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.2.2 For &apos;services that are not delivered&apos; we will
                contact you to request for proof of delivery. The documentation
                must clearly show that you have rendered the service to the
                buyer. The documentation must be able to be tracked online
                showing the date the service was delivered and the status update
                that the service was delivered (buyer&apos;s acceptance). This
                is the only evidence that we will accept as proof of delivery.
                If proof of delivery cannot be provided then we may resolve the
                dispute in favour of the buyer.
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                2.2.3 For &apos;service significantly deviates from the
                deliverables and the milestones agreed between both
                parties&apos; disputes, we will be reviewing the service
                description that were provided at the time of purchase. If both
                parties cannot agree as to the difference between the service
                that was sold and what was described, we will make a fair
                decision based on all the information we hold about the service.
                We will exercise our decision-making authority based on numerous
                factors, which include the description of the service at the
                point of purchase, communications between you and the buyer as
                well as any documentation provided. All decisions made by us are
                final.
              </p>
              <p className="mb-[24px]">&nbsp;</p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3. Refund
              </p>
              <p
                className={`mb-[24px] text-base text-[#ADADAD] ${inter700.className} tracking-wide`}
              >
                3.1 When seeking a refund, Buyer should ensure that the Service,
                including any complimentary items such as documents,
                intellectual property that come with the Service, must be
                returned to Seller. Buyer should take the necessary actions to
                protect their private information when negotiating and engaging
                with Seller. Refer to Our privacy policy for uses and sharing on
                Freelance
              </p>{" "}
            </div>
            {/* refund policy end */}
          </div>
        </div>
      </div>
    </div>
  );
}
