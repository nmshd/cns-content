import { SimpleLoggerFactory } from "@js-soft/simple-logger"
import { HintsInheritanceTest } from "./attributes/HintsInheritance.test"
import { IdentityAttributeTest } from "./attributes/IdentityAttribute.test"
import { IdentityAttributeQueryTest } from "./attributes/IdentityAttributeQuery.test"
import { RelationshipAttributeTest } from "./attributes/RelationshipAttribute.test"
import { RelationshipAttributeHintsTest } from "./attributes/RelationshipAttributeHints.test"
import { ValueHintsTest } from "./attributes/ValueHints.test"
import { AddressValueTests } from "./attributeValues/AddressValueTests.test"
import { BirthValueTests } from "./attributeValues/BirthValueTests.test"
import { NameValueTests } from "./attributeValues/NameValueTests.test"
import { MailTest } from "./messages/Mail.test"
import { RequestMailTest } from "./messages/RequestMail.test"
import { RequestTest } from "./requests/Request.test"
import { ResponseTest } from "./requests/Response.test"

const loggerFactory = new SimpleLoggerFactory()

new ValueHintsTest(loggerFactory).run()
new HintsInheritanceTest(loggerFactory).run()
new MailTest(loggerFactory).run()
new RequestTest(loggerFactory).run()
new ResponseTest(loggerFactory).run()
new RequestMailTest(loggerFactory).run()
new RelationshipAttributeTest(loggerFactory).run()
new IdentityAttributeTest(loggerFactory).run()
new IdentityAttributeQueryTest(loggerFactory).run()
new NameValueTests(loggerFactory).run()
new BirthValueTests(loggerFactory).run()
new AddressValueTests(loggerFactory).run()
new RelationshipAttributeHintsTest(loggerFactory).run()
