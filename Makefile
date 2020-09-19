# Makefile for building litmus-e2e
# Reference Guide - https://www.gnu.org/software/make/manual/make.html

IS_DOCKER_INSTALLED = $(shell which docker >> /dev/null 2>&1; echo $$?)

# docker info
# DOCKER_REPO ?= litmuschaos
# DOCKER_IMAGE ?= litmus-e2e
# DOCKER_TAG ?= ci

TESTPATH ?= /home/udit/go/src/github.com/litmuschaos/litmus-e2e

.PHONY: install-portal
-install-portal:

	@echo "-----------"
	@echo "Installing Litmus-Portal"
	@echo "-----------"
	@sshpass -p ${portal_pass} ssh -o StrictHostKeyChecking=no ${portal_user}@${ip} -p ${port} -tt \
	 "chmod 755 ${TESTPATH}./install.sh"
	@sshpass -p ${portal_pass} ssh -o StrictHostKeyChecking=no ${portal_user}@${ip} -p ${port} -tt \
	 "${TESTPATH}./install.sh"

.PHONY: cypress-setup
-cypress-setup:

	@echo "-----------"
	@echo "Installing Cypress"
	@echo "-----------"
	@sshpass -p ${portal_pass} ssh -o StrictHostKeyChecking=no ${portal_user}@${ip} -p ${port} -tt \
	 "cd ${TESTPATH}/CypressE2E && npm ci"

.PHONY: e2e-testing
-e2e-testing:

	@echo "-----------"
	@echo "Started Cypress e2e-testing"
	@echo "-----------"
	@sshpass -p ${portal_pass} ssh -o StrictHostKeyChecking=no ${portal_user}@${ip} -p ${port} -tt \
	 "cd ${TESTPATH}/CypressE2E && CYPRESS_BASE_URL=http://${FRONTEND_IP}:9091/ npm test"

.PHONY: uninstall-portal
-uninstall-portal:

	@echo "-----------"
	@echo "Uninstalling Litmus-Portal"
	@echo "-----------"
	@sshpass -p ${portal_pass} ssh -o StrictHostKeyChecking=no ${portal_user}@${ip} -p ${port} -tt \
	 "chmod 755 ${TESTPATH}./uninstall.sh"
	@sshpass -p ${portal_pass} ssh -o StrictHostKeyChecking=no ${portal_user}@${ip} -p ${port} -tt \
	 "${TESTPATH}./uninstall.sh"