import { SimpleLoggerFactory } from "@js-soft/simple-logger"
import { AttributeTest } from "./attributes/Attribute.test"
import { AttributeQueryTest } from "./attributes/AttributeQuery.test"
import { MailTest } from "./messages/Mail.test"
import { RequestMailTest } from "./messages/RequestMail.test"

const loggerFactory = new SimpleLoggerFactory()

new MailTest(loggerFactory).run()
new RequestMailTest(loggerFactory).run()
new AttributeTest(loggerFactory).run()
new AttributeQueryTest(loggerFactory).run()
